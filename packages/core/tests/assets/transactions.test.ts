import { describe, expect, it } from 'vitest';
import { accounts, feeds, labels, transactions } from '../../src';
import { Category, RecordDirection, RecordType } from '../../src/lookups/enums';
import feed from '../../src/feeds';
import { Transaction } from '../../src/lookups';

const AUG_1_2022 = new Date(2022, 7, 1);
const AUG_5_2022 = new Date(2022, 7, 5);
const AUG_12_2022 = new Date(2022, 7, 12);
const NOV_4_2022 = new Date(2022, 10, 4);

describe('Assets > Transactions', async () => {
  const cashAccount = await accounts.createAccount({
    name: 'Cash Account',
  });
  const axisAccount = await accounts.createAccount({
    name: 'Axis Bank',
  });

  const dummyLabel1 = await labels.createLabel({
    value: 'DL 1',
  });
  const dummyLabel2 = await labels.createLabel({
    value: 'DL 2',
  });

  let transaction1: Transaction;
  let transaction2: Transaction;

  it('createTransaction()', async () => {
    transaction1 = await transactions.createTransaction({
      accountId: cashAccount.id,
      type: RecordType.Expense,
      category: Category.Food,
      amount: 200,
      direction: RecordDirection.Left,
      labels: [dummyLabel1.id, dummyLabel2.id],
      timestamp: AUG_12_2022.getTime(),
      isRecurringTransaction: false,
    });

    transaction2 = await transactions.createTransaction({
      accountId: axisAccount.id,
      type: RecordType.Income,
      category: Category.Other,
      amount: 3200,
      direction: RecordDirection.Right,
      labels: [dummyLabel1.id, dummyLabel2.id],
      timestamp: AUG_5_2022.getTime(),
      isRecurringTransaction: false,
    });

    expect(transaction1.id).not.toBeNull();
    expect(transaction2.id).not.toBeNull();

    expect(feed.transactions.count()).toBe(2);
  });

  it('getAllTransactions()', async () => {
    let txs1 = await transactions.getAllTransactions({
      dateRange: {
        from: AUG_1_2022,
        to: AUG_12_2022,
      },
    });
    expect(txs1.length).toBe(2);

    let txs = await transactions.getAllTransactions({
      dateRange: {
        from: AUG_1_2022,
        to: AUG_5_2022,
      },
    });
    expect(txs.length).toBe(1);
  });
});
