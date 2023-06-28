import React, { useState } from 'react';
import LabelsIcon from '../../icons/LabelsIcon';
import { Label } from '../../types';
import EditIcon from '../../icons/EditIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import LabelModal from './LabelModal';

export type LabelCardProps = {
  label: Label;
};

const LabelCard = (props: LabelCardProps) => {
  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const { label } = props;
  return (
    <>
      <LabelModal openModal={openLabelModal} setOpenModal={setOpenLabelModal} labelDetails={label} />
      <div className="flex justify-between border rounded-md p-4">
        <span className="flex items-center font-medium">
          {/* <LabelsIcon className="w-5 h-5 mr-1" /> */}
          <div className="h-5 w-5 rounded mr-2" style={{ backgroundColor: label.accent }}></div>
          {label.value}
        </span>
        <span className='flex items-center justify-around'>
          <button className="text-slate-400 hover:text-slate-500 border rounded-lg p-0.5 mr-1" onClick={() => setOpenLabelModal(true)}>
            <EditIcon className="w-5 h-5" />
          </button>
          <button className="text-red-400 hover:text-red-500 border rounded-lg p-0.5">
            <DeleteIcon className="w-5 h-5" />
          </button>
        </span>
      </div>
    </>
  );
};

export default LabelCard;
