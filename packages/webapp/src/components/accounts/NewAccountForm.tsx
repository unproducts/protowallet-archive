import React, { useState } from 'react';
import PalletPicker from '../shared/PalletPicker';

export default function NewAccountForm() {
  const [title, setTitle] = useState('');
  const [accent, setAccent] = useState(1);

  return (
    <div className="px-5 py-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name <span className="text-rose-500">*</span>
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
            Accent <span className="text-rose-500">*</span>
          </label>
          <PalletPicker setPalletNumber={setAccent} />
        </div>
      </div>
    </div>
  );
}
