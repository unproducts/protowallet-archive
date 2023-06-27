import React from 'react';
import { Label } from '../../types';
import LabelCard from './LabelCard';

const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

const Labels = () => {
  const labels: Label[] = [
    { id: 'label1', value: 'Label 1', accent: generateRandomColor() },
    { id: 'label2', value: 'Label 2', accent: generateRandomColor() },
  ];
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Labels ✨</h1>
        </div>
        {/* Add card button */}
        {/* <NewAccountModal /> */}
      </div>

      {/* Credit cards */}
      <div className="grid grid-cols-12 gap-2">
        {/* Card 1 */}
        {labels.map((label) => (
          <div className="col-span-3 p-1">
            <LabelCard label={label} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labels;
