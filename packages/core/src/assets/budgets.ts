import later, { ScheduleData } from '@breejs/later';

import feeds from '../feeds';
import { Budget, Range, RecurringBudget } from '../lookups';
import { EndRecurrenceBy } from '../lookups/enums';
import { generateRandomStringOfLength } from '../utils';

export type GetAllBudgetsOptions = {
  dateRange: Range<Date>;
};

export type CreateBudgetOptions = Omit<Budget, 'id'>;

export async function getBudget(budgetId: string): Promise<Budget | null> {
  return feeds.budgets.findOne({
    id: budgetId,
  });
}

export async function createBudget(options: CreateBudgetOptions): Promise<Budget> {
  return feeds.budgets.insert({
    id: generateRandomStringOfLength(10),
    ...options,
  }) as Budget;
}

export async function getAllBudgets(options: GetAllBudgetsOptions): Promise<Budget[]> {
  const query: Record<string, any> = prepareQueryFromOptions(options);

  const budgets: Budget[] = feeds.budgets.chain().find(query).simplesort('startDate').data();
  const recurringBudgets: RecurringBudget[] = feeds.recurringBudgets.find();
  const recurringBudgetsFlat: Budget[] = flattenRecurringBudgets(recurringBudgets, options.dateRange.from, options.dateRange.to);
  return budgets.concat(recurringBudgetsFlat);
}

function flattenRecurringBudgets(recurringBudgets: RecurringBudget[], generateFrom: Date, generateTill: Date): Budget[] {
  let generatedBudgets: Budget[] = [];
  for (let index = 0; index < recurringBudgets.length; index++) {
    const recurringBudget = recurringBudgets[index];
    const budgets = flattenRecurringBudget(recurringBudget, generateFrom, generateTill);
    generatedBudgets = generatedBudgets.concat(budgets);
  }
  return generatedBudgets;
}

function flattenRecurringBudget(recurringBudget: RecurringBudget, generateFrom: Date, generateTill: Date): Budget[] {
  const cronExpr: string = recurringBudget.cronExpr;

  const schedule: ScheduleData = later.parse.cron(cronExpr);

  let timestamps: Date[];
  if (recurringBudget.endTokenType == EndRecurrenceBy.Count) {
    const count = recurringBudget.endToken as number;
    timestamps = later.schedule(schedule).next(count, recurringBudget.startDate) as Date[];
  } else if (recurringBudget.endTokenType == EndRecurrenceBy.EndDate) {
    const endDate: Date = recurringBudget.endToken as Date;
    timestamps = later.schedule(schedule).next(500, generateFrom, endDate) as Date[];
  } else if (recurringBudget.endTokenType == EndRecurrenceBy.NeverEnd) {
    timestamps = later.schedule(schedule).next(500, generateFrom, generateTill) as Date[];
  } else {
    timestamps = [];
  }

  const generatedBudgets: Budget[] = [];

  if (timestamps.length == 1) {
    const timestamp = timestamps[0];
    const budget: Budget = generateBudgetFromRecurringBudget(recurringBudget, timestamp, generateTill);
    generatedBudgets.push(budget);
  }

  for (let index = 0; index < timestamps.length - 1; index++) {
    const timestamp = timestamps[index];

    const nextTimestamp = timestamps[index + 1];
    nextTimestamp.setMilliseconds(nextTimestamp.getMilliseconds() - 1);

    const budget: Budget = generateBudgetFromRecurringBudget(recurringBudget, timestamp, nextTimestamp);
    generatedBudgets.push(budget);
  }

  return generatedBudgets;
}

function generateBudgetFromRecurringBudget(recurringBudget: RecurringBudget, startDate: Date, endDate: Date): Budget {
  return {
    id: generateRandomStringOfLength(10),
    ...recurringBudget,
    isRecurring: true,
    startDate,
    endDate,
  };
}

function prepareQueryFromOptions(options: GetAllBudgetsOptions): Record<string, any> {
  const query: Record<string, any> = {
    $and: [
      {
        startDate: {
          $gte: options.dateRange.from,
        },
      },
      {
        startDate: {
          $lte: options.dateRange.to,
        },
      },
    ],
  };

  return query;
}
