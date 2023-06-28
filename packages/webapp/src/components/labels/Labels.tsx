import React, { useState } from 'react';
import { Label } from '../../types';
import LabelCard from './LabelCard';
import PageTitle from '../shared/PageTitle';
import LabelModal from './LabelModal';

const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

const Labels = () => {
  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const labels: Label[] = [
    { id: 'label1', value: 'Label 1', accent: generateRandomColor() },
    { id: 'label2', value: 'Label 2', accent: generateRandomColor() },
  ];
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      {/* Left: Title */}
      <PageTitle title='Labels' resourceName='Label' setOpenCreateModal={setOpenLabelModal} />
      {/* Add card button */}
      <LabelModal openModal={openLabelModal} setOpenModal={setOpenLabelModal} />

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
