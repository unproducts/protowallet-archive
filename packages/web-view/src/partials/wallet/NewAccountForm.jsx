import { useState } from 'react';
import DatePicker from 'react-flatpickr';
import CreatableSelect from 'react-select/creatable';

export default function NewAccountForm(){
    const [accountOptions, setAccountOptions] = useState([
        {
          value: 'test-label',
          label: 'Current Account',
        },
      ]);
      const [labelOptions, setLabelOptions] = useState([
        {
          value: 'test-label',
          label: 'Test Label',
        },
      ]);
      const [categoryOptions, setCategoryOptions] = useState([
        {
          value: 'test-cateogry',
          label: 'Test',
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
              <label className="block text-sm font-medium mb-1" htmlFor="feedback">
                Note <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="feedback"
                className="form-textarea w-full px-2 py-1"
                rows="4"
                required
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Type <span className="text-rose-500">*</span>
              </label>
              <CreatableSelect options={accountOptions} isMulti />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Accent <span className="text-rose-500">*</span>
              </label>
              <CreatableSelect options={accountOptions} isMulti />
            </div>
          </div>
        </div>
      );    
}