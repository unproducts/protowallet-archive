import React from 'react';
import ModalBasic from './ModalBasic';
import LabelForm from '../labels/LabelForm';
import { SetStateActionType } from '../../types';

type LabelModalProps<ResourceType> = {
  openModal: boolean,
  resourceDetails?: ResourceType,
  setOpenModal: SetStateActionType<boolean>,
  setResourceDetails?: SetStateActionType<ResourceType>
  resourceName: string
}

const FORMS_LIST: Record<string, React.FC<any>> = {
  'label': LabelForm
}

export default function ResourceModal<ResourceType>({ openModal, resourceName, resourceDetails, setResourceDetails, setOpenModal }: LabelModalProps<ResourceType>) {

  const Form: React.FC<any> = FORMS_LIST[resourceName];

  return (
    <div>
      {/* Send Feedback */}
      <div className="m-1.5">
        {/* Start */}
        <ModalBasic id="feedback-modal" modalOpen={openModal} setModalOpen={setOpenModal} title="Send Feedback">
          {/* Modal content */}
          <Form resourceDetails={resourceDetails} setResourceDetails={setResourceDetails} setOpenModal={setOpenModal} />
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
          </div>
        </ModalBasic>
        {/* End */}
      </div>
    </div>
  );
}
