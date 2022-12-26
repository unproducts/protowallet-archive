import { Account, Label, RecurringTransaction, Transaction } from '../lookups';

export type ApplicationDB = {
  accounts: Collection<Account>;
  transactions: Collection<Transaction>;
  labels: Collection<Label>;
  recurringTransactions: Collection<RecurringTransaction>;
};
