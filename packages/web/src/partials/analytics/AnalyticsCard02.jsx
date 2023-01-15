import React from 'react';
import LineChart from '../../charts/LineChart04';
import { Link } from 'react-router-dom';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function AnalyticsCard02() {
  return (
    <div className="flex flex-col col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recurring Transaction</h2>
      </header>
      {/* Card content */}
      <div className="flex flex-col h-full">
        {/* Table */}
        <div className="grow px-5 pt-3 pb-1">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-slate-400">
                <tr>
                  <th className="py-2">
                    <div className="font-semibold text-left">Highest Transactions</div>
                  </th>
                  <th className="py-2">
                    <div className="font-semibold text-right">Amount</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-100">
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Food</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">94</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Housing</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">42</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Investment</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">12</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Transfer</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-slate-800">4</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card footer */}
        <div className="text-right px-5 pb-4">
          <Link className="text-sm font-medium text-indigo-500 hover:text-indigo-600" to="#0">
            All Recurring Transactions -&gt;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard02;
