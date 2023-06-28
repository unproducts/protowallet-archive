import React, { useState } from 'react';
import PalletPicker from '../shared/PalletPicker';
import { Label, SetStateActionType } from '../../types';

type LabelFormProps = {
  labelDetails?: Label,
  setLabelDetails?: SetStateActionType<Label>,
  setOpenModal: SetStateActionType<boolean>,
}

export default function LabelForm({ labelDetails, setLabelDetails, setOpenModal }: LabelFormProps) {
  const [name, setName] = useState<string>(labelDetails?.value || '');
  const [accent, setAccent] = useState<string>(labelDetails?.accent || '');

  const createLabel = () => {
    // post call
  };

  const updateLabelDetails = () => {
    // put call
    setLabelDetails?.(prevState => ({ ...prevState, value: name, accent }));
  };

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
          onChange={({ target: { value } }) => {
            setName(value);
          }}
        />
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Accent <span className="text-rose-500">*</span>
        </label>
        /**
        TODO: Create a component for custom color picker
        */
        {/* <PalletPicker setPalletNumber={setAccent} /> */}
        <div className="flex flex-wrap justify-end space-x-2">
          <button
            className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(false);
            }}
          >
            Cancel
          </button>
          {
            labelDetails ? <button className="btn-sm bg-primary-500 hover:bg-primary-600 text-white" onClick={() => updateLabelDetails()}>Edit</button> :
              <button className="btn-sm bg-primary-500 hover:bg-primary-600 text-white" onClick={() => createLabel()}>Create</button>
          }

        </div>
      </div>
    </div>
  );
}
