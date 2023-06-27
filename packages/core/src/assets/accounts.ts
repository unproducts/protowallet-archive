import feed from '../feeds';
import { Account } from '../lookups';
import { generateRandomColor, generateRandomStringOfLength } from '../utils';

export async function getAccount(accountId: string): Promise<Account | null> {
  return feed.accounts.findOne({
    id: accountId,
  });
}

export async function getAllAccounts(): Promise<Account[]> {
  return feed.accounts.find();
}

export async function createAccount(options: CreateAccountOptions): Promise<Account> {
  const totalAccounts = await getTotalAccounts();
  const account: Account = {
    id: generateRandomStringOfLength(3),
    name: options.name,
    index: options.index ? options.index : totalAccounts,
    accent: options.accent ? options.accent : generateRandomColor(),
    createdAt: new Date(),
    initialBalance: options.initialBalance ? options.initialBalance : 0,
  };
  return feed.accounts.insert(account) as Account;
}

export async function getTotalAccounts(): Promise<number> {
  return feed.accounts.count();
}

export async function assertAccountExists(accountId: string): Promise<void> {
  const account = await getAccount(accountId);
  if (account == null) {
    throw new Error(`Account ${accountId} doesn't exist.`);
  }
}

export type CreateAccountOptions = {
  name: string,
  initialBalance?: number,
  index?: number,
  accent?: string,
};
