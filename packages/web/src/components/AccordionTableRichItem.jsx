import React, { useState } from 'react';

function AccordionTableRichItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <tbody className="text-sm">
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-slate-800">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
              <img className="rounded-full ml-1" src={props.image} width="40" height="40" alt={props.customer} />
            </div>
            <div className="font-medium text-slate-800">{props.customer}</div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          {/* Start */}
          <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">
            <svg className="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
              <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
            </svg>
            <span className="ml-2">Edit</span>
          </button>
          {/* End */}
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          {/* Start */}
          <button className="btn border-slate-200 hover:border-slate-300 text-rose-500">
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
            </svg>
            <span className="ml-2">Delete</span>
          </button>
          {/* End */}
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <button
              className={`text-slate-400 hover:text-slate-500 ${open && 'rotate-180'}`}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              aria-controls={`description-${props.id}`}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {/*
      Example of content revealing when clicking the button on the right side:
      Note that you must set a "colSpan" attribute on the <td> element,
      and it should match the number of columns in your table
      */}
      <tr id={`description-${props.id}`} role="region" className={`${!open && 'hidden'}`}>
        <td colSpan="10" className="px-2 first:pl-5 last:pr-5 py-3">
          <label className="relative block cursor-pointer text-left w-full">
            <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
            <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
              <div className="grid grid-cols-12 items-center gap-x-2">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
                  <img className="rounded-full ml-1" src={props.image} width="40" height="40" alt={props.customer} />
                </div>
                {/* Name */}
                <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                  <div className="text-sm font-medium text-slate-800 truncate">Dominik Lamakani</div>
                </div>
                {/* Start Edit Button */}
                <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">
                  <svg className="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                  <span className="ml-2">Edit</span>
                </button>
                {/* End */}
                {/* Start Delete Button*/}
                <button className="btn border-slate-200 hover:border-slate-300 text-rose-500">
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                    <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                  </svg>
                  <span className="ml-2">Delete</span>
                </button>
                {/* End */}
              </div>
            </div>
            <div
              className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
              aria-hidden="true"
            />
          </label>
        </td>
      </tr>
      <tr id={`description-${props.id}`} role="region" className={`${!open && 'hidden'}`}>
        <td colSpan="10" className="px-2 first:pl-5 last:pr-5 py-3">
          <label className="relative block cursor-pointer text-left w-full">
            <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
            <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
              <div className="grid grid-cols-12 items-center gap-x-2">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
                  <img className="rounded-full ml-1" src={props.image} width="40" height="40" alt={props.customer} />
                </div>
                {/* Name */}
                <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                  <div className="text-sm font-medium text-slate-800 truncate">Dominik Lamakani</div>
                </div>
                {/* Start Edit Button */}
                <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">
                  <svg className="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                  <span className="ml-2">Edit</span>
                </button>
                {/* End */}
                {/* Start Delete Button*/}
                <button className="btn border-slate-200 hover:border-slate-300 text-rose-500">
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                    <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                  </svg>
                  <span className="ml-2">Delete</span>
                </button>
                {/* End */}
              </div>
            </div>
            <div
              className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
              aria-hidden="true"
            />
          </label>
        </td>
      </tr>
    </tbody>
  );
}

export default AccordionTableRichItem;
