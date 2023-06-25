import React, { useState, useEffect } from 'react';
import NewAccountModal from './NewAccountModal';
import AccountCard from './AccountCard';

function Accounts() {

	const [accountsData, setAccountsData] = useState([{ title: 'Bank Of India', amount: '$304,502' },{ title: 'Swiss Bank', amount: '$304,502,123' }]);

	useEffect(() => {
		// fetching all the account details
	}, [])

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
			<div className="space-y-2">
				{/* Card 1 */}
				{
					accountsData.map(account => <AccountCard accountDetails={account} />)
				}
			</div>
		</div>
	);
}

export default Accounts;
