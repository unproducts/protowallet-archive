import React, { useState } from 'react';
import ModalBasic from '../shared/ModalBasic';
import LabelForm from './LabelForm';
import { Label, SetStateActionType } from '../../types';

type LabelModalProps = {
  openModal: boolean,
  labelDetails?: Label,
  setOpenModal: SetStateActionType<boolean>,
  setLabelDetails?: SetStateActionType<Label>
}

export default function LabelModal({ openModal, labelDetails, setLabelDetails, setOpenModal }: LabelModalProps) {
  return (
    <div>
      {/* Send Feedback */}
      <div className="m-1.5">
        {/* Start */}
        <ModalBasic id="feedback-modal" modalOpen={openModal} setModalOpen={setOpenModal} title="Send Feedback">
          {/* Modal content */}
          <LabelForm labelDetails={labelDetails} setLabelDetails={setLabelDetails} setOpenModal={setOpenModal}/>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
          </div>
        </ModalBasic>
        {/* End */}
      </div>
    </div>
  );
}
