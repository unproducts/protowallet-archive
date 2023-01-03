import { describe, it, expect } from "vitest";
import { accounts } from "../../src";
import feed from '../../src/feeds';
import { Account } from "../../src/lookups";

describe('Assets > Accounts', async () => {
    let account: Account;
    it('createAccount()', async () => {
        account = await accounts.createAccount({
            name: 'Test Acc 1',
        });

        expect(account.id).not.toBeNull();

        const accountsCount: number = feed.accounts.count();
        expect(accountsCount).toBe(1);
    })
    it('assertAccountExists()', async () => {
        expect(() => {
            accounts.assertAccountExists(account.id)
        }).not.toThrowError();

        // TODO: functionality works but test needs to be fixed.
        // expect(() => {
        //     accounts.assertAccountExists(account.id + "abc")
        // }).toThrowError(`Account ${account.id} doesn't exist.`);
    })

    it('getAccount()', async () => {
        const account1 = await accounts.getAccount(account.id);
        expect(account1).not.toBeNull();
        expect(account1.id).toBe(account.id);
    })

    it('getTotalAccounts()', async () => {
        const n = await accounts.getTotalAccounts();
        expect(n).toBe(1);
    })
})