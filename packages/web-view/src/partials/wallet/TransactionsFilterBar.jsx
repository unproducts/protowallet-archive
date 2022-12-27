import React, { useState } from 'react';

function TransactionsFilterBar() {

  const [companySetting, setCompanySetting] = useState(true);
  const [immigrationSetting, setImmigrationSetting] = useState(false);

  return (
    <div className="space-y-8">
      {/* White box */}
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 p-5 min-w-60">
        <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-6">
          {/* Group 1 */}
          <div>
            <div className="text-sm text-slate-800 font-semibold mb-3">Accounts</div>
            <ul className="space-y-2">
            <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                  <span className="text-sm text-slate-600 font-medium ml-2 italic">All Accounts</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                  <span className="text-sm text-slate-600 font-medium ml-2">Cash Account</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-sm text-slate-600 font-medium ml-2">Axis Bank</span>
                </label>
              </li>
            </ul>
          </div>
          {/* Group 2 */}
          <div>
            <div className="text-sm text-slate-800 font-semibold mb-3">Company Culture</div>
            <div className="flex items-center">
              <div className="form-switch">
                <input
                  type="checkbox"
                  id="company-toggle"
                  className="sr-only"
                  checked={companySetting}
                  onChange={() => setCompanySetting(!companySetting)}
                />
                <label className="bg-slate-400" htmlFor="company-toggle">
                  <span className="bg-white shadow-sm" aria-hidden="true"></span>
                  <span className="sr-only">Company Culture</span>
                </label>
              </div>
              <div className="text-sm text-slate-400 italic ml-2">{companySetting ? 'On' : 'Off'}</div>
            </div>
            <div className="text-sm italic mt-3">Only show companies that are creating a positive culture</div>
          </div>
          {/* Group 3 */}
          <div>
            <div className="text-sm text-slate-800 font-semibold mb-3">Salary Range</div>
            <ul className="space-y-2">
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                  <span className="text-sm text-slate-600 font-medium ml-2">$20K - $50K</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-sm text-slate-600 font-medium ml-2">$50K - $100K</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-sm text-slate-600 font-medium ml-2">&gt; $100K</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-sm text-slate-600 font-medium ml-2">Drawing / Painting</span>
                </label>
              </li>
            </ul>
          </div>
          {/* Group 4 */}
          <div>
            <div className="text-sm text-slate-800 font-semibold mb-3">Immigration</div>
            <div className="flex items-center">
              <div className="form-switch">
                <input
                  type="checkbox"
                  id="immigration-toggle"
                  className="sr-only"
                  checked={immigrationSetting}
                  onChange={() => setImmigrationSetting(!immigrationSetting)}
                />
                <label className="bg-slate-400" htmlFor="immigration-toggle">
                  <span className="bg-white shadow-sm" aria-hidden="true"></span>
                  <span className="sr-only">Immigration</span>
                </label>
              </div>
              <div className="text-sm text-slate-400 italic ml-2">{immigrationSetting ? 'On' : 'Off'}</div>
            </div>
            <div className="text-sm italic mt-3">Only show companies that can sponsor a visa</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsFilterBar;