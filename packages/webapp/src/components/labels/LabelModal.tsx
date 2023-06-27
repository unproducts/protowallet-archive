import React, { useState } from 'react';
import ModalBasic from '../shared/ModalBasic';
import LabelForm from './LabelForm';
import { Label, SetStateActionType } from '../../types';

type LabelModalProps = {
  openModal: boolean,
  labelDetails?: Label
  setOpenModal: SetStateActionType<boolean>
}

export default function LabelModal({ openModal, setOpenModal, labelDetails }: LabelModalProps) {

  const [name, setName] = useState<string>(labelDetails?.value || '');
  const [accent, setAccent] = useState<string>(labelDetails?.accent || '');
  
  const createLabel = () => {
    // post call
  };

  const updateLabelDetails = () => {
    // put call
  };

  return (
    <div>
      {/* Send Feedback */}
      <div className="m-1.5">
        {/* Start */}
        <ModalBasic id="feedback-modal" modalOpen={openModal} setModalOpen={setOpenModal} title="Send Feedback">
          {/* Modal content */}
          <LabelForm name={name} accent={accent} setName={setName} setAccent={setAccent} />
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
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
        </ModalBasic>
        {/* End */}
      </div>
    </div>
  );
}
