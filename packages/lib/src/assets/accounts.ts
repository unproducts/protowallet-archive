import feed from 'src/feeds';
import { Account } from 'src/lookups';
import { generateRandomColor, generateRandomStringOfLength } from '../utils';

export async function getAccount(accountId: string): Promise<Account | null> {
  return feed.accounts.findOne({
    id: accountId,
  });
}

export async function createAccount(options: CreateAccountOptions): Promise<Account> {
  const totalAccounts = await getTotalAccounts();
  const account: Account = {
    id: generateRandomStringOfLength(3),
    name: options.name,
    index: options.index ? options.index : totalAccounts,
    accent: options.accent ? options.accent : generateRandomColor(),
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
  index?: number,
  accent?: string,
};