import React, { useState } from 'react';

import Sidebar from '../../partials/wallet/Sidebar';
import Header from '../../partials/Header';
import NewLabelModal from '../../partials/wallet/NewLabelModal';
import Image01 from '../../images/user-40-07.jpg';

function Labels() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items2 = [
    {
      id: '0',
      image: Image01,
      customer: 'Mark Cameron',
      email: 'mark.cameron@app.com',
      location: '🇬🇧 London, UK',
      date: '22/01/2021',
      amount: '+249.88',
      descriptionTitle: 'Excepteur sint occaecat cupidatat.',
      descriptionBody:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis. Ut enim ad minim veniam quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: '0',
      image: Image01,
      customer: 'Mark Cameron',
      email: 'mark.cameron@app.com',
      location: '🇬🇧 London, UK',
      date: '22/01/2021',
      amount: '+249.88',
      descriptionTitle: 'Excepteur sint occaecat cupidatat.',
      descriptionBody:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis. Ut enim ad minim veniam quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="lg:relative lg:flex">
            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-5">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Labels ✨</h1>
                </div>

                {/* Add card button */}
                <NewLabelModal />
              </div>

              {/* Categories cards */}
              <div className="space-y-2">
                {/* Categories */}
                <div>
                  <h2 className="text-2xl text-slate-800 font-bold mb-6">List of Labels</h2>
                  {/* Start */}
                  <div className="rounded-sm border border-slate-200">
                    {items2.map((item) => (
                      <label className="relative block cursor-pointer text-left w-full">
                        <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
                        <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                          <div className="grid grid-cols-12 items-center gap-x-2">
                            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
                              <img className="rounded-full ml-1" src={item.image} width="40" height="40" alt={item.customer} />
                            </div>
                            {/* Name */}
                            {/* <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block"> */}
                              <div className="text-sm font-medium text-slate-800 truncate">Dominik Lamakani</div>
                            {/* </div> */}
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
                    ))}
                  </div>
                  {/* End */}
                </div>
                {/* Card 1 */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Labels;
