import * as accounts from 'src/assets/accounts';
import * as transactions from 'src/assets/transactions';
import * as labels from 'src/assets/labels';
import * as feeds from 'src/feeds';

import Calculator from 'src/calculator';

console.log("HHHERREE")
console.log(accounts);

const assets = {
    accounts,
    transactions,
    labels,
}

export default {
    assets,
    feeds,
    Calculator
};