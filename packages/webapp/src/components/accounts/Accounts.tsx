import React, { useState, useEffect } from 'react';
import NewAccountModal from './AccountModal';
import AccountCard from './AccountCard';
import { CalculatedAccount } from '../../types';

function Accounts() {
  const createdDate1 = new Date();
  createdDate1.setDate(createdDate1.getDate() - 1);
  const createdDate2 = new Date();
  createdDate2.setDate(createdDate2.getDate() - 12);
  const [accountsData, setAccountsData] = useState<CalculatedAccount[]>([
    { id: 'aklf', name: 'Bank Of India', balance: 100000, createdAt: createdDate1, index: 0, accent: 'blue', initialBalance: 100000 },
    { id: 'akldf', name: 'Cash', balance: 10002, createdAt: createdDate2, index: 0, accent: 'blue', initialBalance: 10000 },
  ]);

  useEffect(() => {
    // fetching all the account details
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Accounts ✨</h1>
        </div>
        {/* Add card button */}
        <NewAccountModal />
      </div>

      {/* Credit cards */}
      <div className="grid grid-cols-12 gap-2">
        {/* Card 1 */}
        {accountsData.map((account) => (
          <div className='col-span-3 p-1'>
            <AccountCard account={account} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
