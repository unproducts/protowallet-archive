import { useState } from 'react';

export default function CheckboxList({ filterOptions, selectedFilters, setSelectedFilters }) {
  const onCheckHandler = (event, value) => {
    if (event.target.checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      const currselectedFilters = [...selectedFilters];
      setSelectedFilters(currselectedFilters.filter((f) => f !== value));
    }
  };

  return (
    <ul className="space-y-2">
      {filterOptions.map((check, index) => (
        <li key={check + index}>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" onChange={(event) => onCheckHandler(event, check)} />
            <span className="text-sm text-slate-600 font-medium ml-2 italic">{check}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
