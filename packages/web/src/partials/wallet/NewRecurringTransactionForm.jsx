import { useState } from 'react';
import DatePicker from 'react-flatpickr';
import Select from 'react-select';

export default function NewRecurringTransactionForm() {
  const [accountOptions, setAccountOptions] = useState([
    {
      value: 'test-label',
      label: 'Current Account',
    },
  ]);
  const [amount, setAmount] = useState([]);
  const [account, setAccount] = useState([]);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="px-5 py-4">
      <div className="text-sm">
        <div className="font-medium text-slate-800 mb-3">Testing</div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            className="form-input w-full px-2 py-1"
            type="text"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Amount <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            className="form-input w-full px-2 py-1"
            type="text"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Account <span className="text-rose-500">*</span>
          </label>
          <Select options={accountOptions} isMulti />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Category <span className="text-rose-500">*</span>
          </label>
          <Select options={accountOptions} isMulti />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Label <span className="text-rose-500">*</span>
          </label>
          <Select options={accountOptions} isMulti />
        </div>
      </div>
    </div>
  );
}
