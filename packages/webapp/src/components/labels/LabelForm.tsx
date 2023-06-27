import React, { useState } from 'react';
import PalletPicker from '../shared/PalletPicker';
import { Label, SetStateActionType } from '../../types';

type LabelFormProps = {
  name: Label["value"],
  accent: Label["accent"],
  setName: SetStateActionType<Label["value"]>,
  setAccent: SetStateActionType<Label["accent"]>
}

export default function LabelForm({name, accent, setName, setAccent}: LabelFormProps) {

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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Accent <span className="text-rose-500">*</span>
        </label>
        /**
        TODO: Create a component for custom color picker
        */
        {/* <PalletPicker setPalletNumber={setAccent} /> */}
      </div>
    </div>
  );
}
