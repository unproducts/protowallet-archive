import React, { Dispatch, SetStateAction } from "react";
import { SetStateActionType } from "../../types";

type PageTitleProps = {
  title: string
  resourceName?: string,
  setOpenCreateModal?: SetStateActionType<boolean>
}

// TODO: fix the styling issue with title and button
function PageTitle({ title, setOpenCreateModal, resourceName }: PageTitleProps) {
  return (
    <>
      <div className="flex mb-4">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">{title}</h1>
        {
          resourceName ? <button
            className="btn bg-primary-500 hover:bg-primary-600 text-white"
            aria-controls="feedback-modal"
            onClick={(e) => {
              e.stopPropagation();
              setOpenCreateModal?.(true);
            }}
          >
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">New {resourceName}</span>
          </button> : null
        }
      </div>
    </>)
}

export default PageTitle;