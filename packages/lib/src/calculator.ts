import { Amount, Transaction } from './lookups';
import { RecordType } from './lookups/enums';

export async function calculateAccountBalance(accountId: string): Promise<Amount> {
  await this.assertAccountExists(accountId);
  const transactions: Transaction[] = this.database.transactions.find({
    accountId: { $eq: accountId },
  });
  return await this.calculateNetTransactionAmount(transactions);
}

export function calculateOverallExpense(): Promise<Amount> {
  return this.calculateNetTransactionAmount(
    this.database.transactions.find({
      type: RecordType.Expense,
    }),
  );
}

export function calculateOverallIncome(): Promise<Amount> {
  return this.calculateNetTransactionAmount(
    this.database.transactions.find({
      type: RecordType.Income,
    }),
  );
}

export async function getTotalAccounts(): Promise<number> {
  return this.database.accounts.count();
}

export async function getTotalTransactions(): Promise<number> {
  return this.database.transactions.count();
}
