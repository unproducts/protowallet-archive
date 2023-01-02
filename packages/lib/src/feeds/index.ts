import loki from 'lokijs';

import { Account, Transaction, Label, RecurringTransaction } from '../lookups';
import { ApplicationFeed } from './types';

const db = new loki('application.db');

const accountsCollection = db.addCollection<Account>('accounts', {
  unique: ['id', 'index'],
});

const transactionsCollection = db.addCollection<Transaction>('transactions', {
  unique: ['id'],
});

const recurringTransactionsCollection = db.addCollection<RecurringTransaction>('recurringTransactions', {
  unique: ['id'],
});

const labelsCollection = db.addCollection<Label>('labels', {
  unique: ['id', 'accent'],
});

const feed: ApplicationFeed = {
  accounts: accountsCollection,
  transactions: transactionsCollection,
  labels: labelsCollection,
  recurringTransactions: recurringTransactionsCollection,
};

export default feed;
