import React, { useEffect } from 'react';
import { ComputedBudget } from '../../types';
import WalletIcon from '../../icons/WalletIcon';


export type AccountDetails = {
	title: string;
	amount: string;
}


export type AccountCardProps = {
	accountDetails: AccountDetails;
};

const AccountCard = ({ accountDetails }: AccountCardProps) => {

	useEffect(() => {
		console.log(accountDetails);
	});

	return (
		<label className="relative block cursor-pointer text-left w-full">
			<input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
			<div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
				<div className="grid grid-cols-12 items-center gap-x-2">
					{/* Card */}
					<WalletIcon className="w-8 h-8 shrink-0 text-slate-400 mr-2" />
					{/* Name */}
					<div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center">
						<div className="text-sm font-medium text-slate-800 truncate">{accountDetails?.title}</div>
					</div>
					{/* Card limits */}
					<div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:col-start-12">
						<div className="text-sm">{accountDetails?.amount}</div>
					</div>
				</div>
			</div>
			<div
				className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
				aria-hidden="true"
			/>
		</label>
	);
};

export default AccountCard;
