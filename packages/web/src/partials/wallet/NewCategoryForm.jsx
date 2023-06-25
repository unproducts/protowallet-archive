import { useState } from 'react';
import DatePicker from 'react-flatpickr';
import Select from 'react-select';

export default function NewCategoryForm() {
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
  const [toggle1, setToggle1] = useState(false);

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
              Category Icon    <span className="text-rose-500">*</span>
            </label>
            <Select options={accountOptions} isMulti />
          </div>
        {/* Start */}
        <div>
          <div className="text-sm text-slate-800 font-semibold mb-3">Sub Category</div>
          <div className="flex items-center">
            <div className="form-switch">
              <input type="checkbox" id="company-toggle" className="sr-only" checked={toggle1} onChange={() => setToggle1(!toggle1)} />
              <label className="bg-slate-400" htmlFor="company-toggle">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only"></span>
              </label>
            </div>
            <div className="text-sm text-slate-400 italic ml-2">{toggle1 ? 'On' : 'Off'}</div>
          </div>
          <div className="text-sm italic mt-3">Is this a sub-category ? Does it belong to under other category</div>
        </div>
        {/* End */}
        {toggle1 ? (
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Master Category    <span className="text-rose-500">*</span>
            </label>
            <Select options={accountOptions} isMulti />
          </div>
        ) : null}
      </div>
    </div>
  );
}
