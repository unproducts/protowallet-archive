import React, { useState } from 'react';
import PalletPicker from '../shared/PalletPicker';

export default function AccountForm() {
  const [title, setTitle] = useState<string>('');
  const [initialBalance, setInitialBalance] = useState<string>('0');
  const [accent, setAccent] = useState<number>(1);

  return (
    <div className="px-5 py-4">
      <div className="space-y-3">
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="name"
          className="form-input w-full px-2 py-1"
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Initial Amount <span className="text-rose-500">*</span>
        </label>
        <input
          id="amount"
          className="form-input w-full px-2 py-1"
          type="number"
          required
          value={initialBalance}
          onChange={(e) => {
            setInitialBalance(e.target.value);
          }}
        />
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Accent <span className="text-rose-500">*</span>
        </label>
        <PalletPicker setPalletNumber={setAccent} />
      </div>
    </div>
  );
}
