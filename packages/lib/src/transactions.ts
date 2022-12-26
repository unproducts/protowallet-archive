import later, { ScheduleData } from 'later';
import database from './db';
import { Label, Range, RecurringTransaction, Transaction } from './lookups';
import { Category, EndRecurrenceBy, RecordType } from './lookups/enums';
import { generateRandomStringOfLength } from './utils';

export type GetAllTransactionsOptions = {
  dateRange: Range<Date>;
  accounts?: string[];
  categories?: Category[];
  labels?: Label[];
  recordTypes?: RecordType[];
  amountRange?: Range<number>;
};

export async function getAllTransactions(options: GetAllTransactionsOptions): Promise<Transaction[]> {
  // TODO: add type safety here. target type: Record<subset of keys of Transaction, any>;
  const query: Record<string, any> = {
    timestamp: {
      $gte: options.dateRange.from.getTime(),
      $lte: options.dateRange.to.getTime(),
    },
  };
  if (options.accounts) {
    query.accountId = {
      $in: options.accounts,
    };
  }
  if (options.categories) {
    query.category = {
      $in: options.categories,
    };
  }
  const transactions: Transaction[] = database.transactions.chain().find(query).simplesort('timestamp').data();

  const recurringTransactions: RecurringTransaction[] = database.recurringTransactions.find();
  const recurringTransactionsFlat: Transaction[] = await flattenRecurringTransactions(
    recurringTransactions,
    options.dateRange.from,
    options.dateRange.to,
  );
  return transactions.concat(recurringTransactionsFlat);
}

async function flattenRecurringTransactions(
  recurringTransactions: RecurringTransaction[],
  generateFrom: Date,
  generateTill: Date,
): Promise<Transaction[]> {
  let generatedTransactions: Transaction[] = [];
  for (let index = 0; index < recurringTransactions.length; index++) {
    const recurringTransaction = recurringTransactions[index];
    const transactions = flattenRecurringTransaction(recurringTransaction, generateFrom, generateTill);
    generatedTransactions = generatedTransactions.concat(transactions);
  }
  return generatedTransactions;
}

function flattenRecurringTransaction(recurringTransaction: RecurringTransaction, generateFrom: Date, generateTill: Date): Transaction[] {
  const cronExpr: string = recurringTransaction.cronExpr;

  const schedule: ScheduleData = later.parse.cron(cronExpr);

  let timestamps: Date[];
  if (recurringTransaction.endTokenType == EndRecurrenceBy.Count) {
    const count = recurringTransaction.endToken as number;
    timestamps = later.schedule(schedule).next(count, generateFrom) as Date[];
  } else if (recurringTransaction.endTokenType == EndRecurrenceBy.EndDate) {
    const endDate: Date = recurringTransaction.endToken as Date;
    timestamps = later.schedule(schedule).next(500, generateFrom, endDate) as Date[];
  } else if (recurringTransaction.endTokenType == EndRecurrenceBy.NeverEnd) {
    timestamps = later.schedule(schedule).next(500, generateFrom, generateTill) as Date[];
  } else {
    timestamps = [];
  }

  const generatedTransactions: Transaction[] = [];
  const utcGenerateFrom = generateFrom.getTime();
  const utcGenerateTill = generateTill.getTime();
  const recurringTransactionNote = '----\nAutogenerated by Wallet App.\n---';

  for (let index = 0; index < timestamps.length; index++) {
    const timestamp = timestamps[index];
    const utcTimestamp = timestamp.getTime();

    if (utcTimestamp > utcGenerateTill) break;
    else if (utcTimestamp < utcGenerateFrom) continue;

    generatedTransactions.push({
      id: generateRandomStringOfLength(10),
      accountId: recurringTransaction.accountId,
      type: recurringTransaction.type,
      category: recurringTransaction.category,
      amount: recurringTransaction.amount,
      direction: recurringTransaction.direction,
      note: recurringTransactionNote,
      labels: recurringTransaction.labels,
      timestamp: utcTimestamp,
      isRecurringTransaction: true,
    });
  }
  return generatedTransactions;
}