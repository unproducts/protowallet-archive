import { Category, Currency, EndRecurrenceBy, RecordDirection, RecordType } from './enums';

export type Account = {
  id: string;
  name: string;
  index: number;
  accent: string;
};

export type Transaction = {
  id: string;
  accountId: string;
  type: RecordType;
  category: Category;
  amount: number;
  direction: RecordDirection;
  note?: string;
  labels?: string[];
  timestamp: number;

  isRecurringTransaction: boolean;
};

export type RecurringTransaction = {
  id: string;
  accountId: string;
  type: RecordType;
  category: Category;
  amount: number;
  direction: RecordDirection;
  labels?: string[];

  startDate: Date;
  endToken?: Date | number;
  endTokenType: EndRecurrenceBy;
  cronExpr: string;
};

export type Label = {
  id: string;
  value: string;
  accent: string;
};

export type Amount = {
  direction: RecordDirection;
  value: number;
  currency: Currency;
};

export type Range<T> = {
  from: T;
  to: T;
};
