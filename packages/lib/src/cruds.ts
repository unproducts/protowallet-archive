import database from './db';
import { ApplicationDB } from './db/types';
import { Account, Amount, Transaction } from './lookups';
import { Category, Currency, RecordDirection, RecordType } from './lookups/enums';
import { generateRandomColor, generateRandomStringOfLength } from './utils';

export class Calculator {
  private database: ApplicationDB;

  constructor() {
    this.database = database;
  }

  public async createAccount(name: string, index?: number, accent?: string): Promise<Account> {
    const totalAccounts = await this.getTotalAccounts();
    const account: Account = {
      id: generateRandomStringOfLength(3),
      name: name,
      index: index ? index : totalAccounts,
      accent: accent ? accent : generateRandomColor(),
    };
    return this.database.accounts.insert(account) as Account;
  }

  public async createTransaction(
    accountId: string,
    type: RecordType,
    category: Category,
    amount: number,
    note?: string,
    direction: RecordDirection = RecordDirection.Right,
    labels: string[] = [],
    timestamp: Date = new Date(),
  ): Promise<Transaction> {
    await this.assertAccountExists(accountId);
    return this.database.transactions.insert({
      id: generateRandomStringOfLength(10),
      accountId: accountId,
      type: type,
      category: category,
      amount: amount,
      direction: direction,
      note: note,
      labels: labels,
      timestamp: timestamp.getTime(),
      isRecurringTransaction: false,
    }) as Transaction;
  }

  public async calculateAccountBalance(accountId: string): Promise<Amount> {
    await this.assertAccountExists(accountId);
    const transactions: Transaction[] = this.database.transactions.find({
      accountId: { $eq: accountId },
    });
    return await this.calculateNetTransactionAmount(transactions);
  }

  public calculateOverallExpense(): Promise<Amount> {
    return this.calculateNetTransactionAmount(
      this.database.transactions.find({
        type: RecordType.Expense,
      }),
    );
  }

  public calculateOverallIncome(): Promise<Amount> {
    return this.calculateNetTransactionAmount(
      this.database.transactions.find({
        type: RecordType.Income,
      }),
    );
  }

  public async getTotalAccounts(): Promise<number> {
    return this.database.accounts.count();
  }

  public async getTotalTransactions(): Promise<number> {
    return this.database.transactions.count();
  }

  public async getAccount(accountId: string): Promise<Account | null> {
    return this.database.accounts.findOne({
      id: accountId,
    });
  }

  private async assertAccountExists(accountId: string): Promise<void> {
    const account = await this.getAccount(accountId);
    if (account == null) {
      throw new Error(`Account ${accountId} doesn't exist.`);
    }
  }

  private async calculateNetTransactionAmount(transactions: Transaction[]): Promise<Amount> {
    let currentBalance = 0;
    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index];
      switch (transaction.direction) {
        case RecordDirection.Right:
          currentBalance += transaction.amount;
          break;
        case RecordDirection.Left:
          currentBalance -= transaction.amount;
          break;
      }
    }
    if (currentBalance < 0) {
      return {
        direction: RecordDirection.Left,
        value: currentBalance * -1,
        currency: Currency.INR,
      };
    } else {
      return {
        direction: RecordDirection.Right,
        value: currentBalance,
        currency: Currency.INR,
      };
    }
  }
}
