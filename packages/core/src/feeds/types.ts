import { Account, Category, Label, RecurringTransaction, Transaction } from '../lookups';

export type ApplicationFeed = {
  accounts: Collection<Account>;
  transactions: Collection<Transaction>;
  labels: Collection<Label>;
  recurringTransactions: Collection<RecurringTransaction>;
  categories: Collection<Category>;
};
