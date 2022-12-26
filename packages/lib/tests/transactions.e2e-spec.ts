import { Calculator } from '../src/cruds';
import database from '../src/db';
import { Account, RecurringTransaction } from '../src/lookups';
import { Category, EndRecurrenceBy, RecordDirection, RecordType } from '../src/lookups/enums';
import { getAllTransactions } from '../src/transactions';

const AUG_1_2022 = new Date(2022, 7, 1);
const AUG_5_2022 = new Date(2022, 7, 5);
const AUG_12_2022 = new Date(2022, 7, 12);
const NOV_4_2022 = new Date(2022, 10, 4);

const FIRST_OF_EVERY_MONTH = '0 0 1 * *';
const EVERY_DAY_1_PM = '0 13 * * *';

describe('Transactions', () => {
  let calculator: Calculator;

  let cashAccount: Account;
  let axisAccount: Account;
  let creditCardAccount: Account;

  beforeAll(async () => {
    calculator = new Calculator();
    cashAccount = await calculator.createAccount('Cash', 0);
    axisAccount = await calculator.createAccount('Axis Bank', 1);
    creditCardAccount = await calculator.createAccount('Credit Card', 2);

    await calculator.createTransaction(cashAccount.id, RecordType.Income, Category.Daily, 1000.0, undefined, RecordDirection.Right, [], AUG_5_2022);

    await calculator.createTransaction(axisAccount.id, RecordType.Income, Category.Food, 2000.0, undefined, RecordDirection.Right, [], AUG_5_2022);
    await calculator.createTransaction(axisAccount.id, RecordType.Expense, Category.Travel, 1500.0, undefined, RecordDirection.Left, [], AUG_5_2022);

    await calculator.createTransaction(
      creditCardAccount.id,
      RecordType.Expense,
      Category.Daily,
      1200.0,
      undefined,
      RecordDirection.Left,
      [],
      AUG_5_2022,
    );
  });

  it('should properly filter transactions based on accountIds', async () => {
    const transactions = await getAllTransactions({
      dateRange: {
        from: AUG_5_2022,
        to: AUG_12_2022,
      },
      accounts: [cashAccount.id, axisAccount.id],
    });
    expect(transactions.length).toBe(3);
  });

  it('RecTrans: should properly fill monthwise recurring', async () => {
    database.recurringTransactions.clear();
    const recurringTransaction: RecurringTransaction = {
      id: 'bla-bla',
      accountId: axisAccount.id,
      type: RecordType.Income,
      category: Category.Other,
      amount: 90_0000,
      direction: RecordDirection.Right,

      startDate: AUG_1_2022,
      endTokenType: EndRecurrenceBy.NeverEnd,
      cronExpr: FIRST_OF_EVERY_MONTH,
    };

    database.recurringTransactions.insert(recurringTransaction);

    const transactions_case_1 = await getAllTransactions({
      dateRange: {
        from: AUG_5_2022,
        to: NOV_4_2022,
      },
      accounts: [axisAccount.id],
    });

    expect(transactions_case_1.length).toBe(5);

    const transactions_case_2 = await getAllTransactions({
      dateRange: {
        from: AUG_1_2022,
        to: AUG_12_2022,
      },
      accounts: [axisAccount.id],
    });

    expect(transactions_case_2.length).toBe(3);
  });

  it('RecTrans: should properly fill daywise recurring', async () => {
    database.recurringTransactions.clear();
    const recurringTransaction: RecurringTransaction = {
      id: 'bla-bla',
      accountId: creditCardAccount.id,
      type: RecordType.Expense,
      category: Category.Food,
      amount: 300,
      direction: RecordDirection.Left,

      startDate: AUG_5_2022,
      endTokenType: EndRecurrenceBy.NeverEnd,
      cronExpr: EVERY_DAY_1_PM,
    };
    database.recurringTransactions.insert(recurringTransaction);

    const transactions_case_1 = await getAllTransactions({
      dateRange: {
        from: AUG_5_2022,
        to: AUG_12_2022,
      },
      accounts: [creditCardAccount.id],
    });

    expect(transactions_case_1.length).toBe(8);
  });
});