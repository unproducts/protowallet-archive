import React, { useState } from 'react';

import Sidebar from '../../partials/wallet/Sidebar';
import Header from '../../partials/Header';
import AccordionTableRichItem from '../../components/AccordionTableRichItem';
import NewCategoryModal from '../../partials/wallet/NewCategoryModal';
import Image01 from '../../images/user-40-07.jpg';
function Categories() {
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
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Categories ✨</h1>
                </div>

                {/* Add card button */}
                <NewCategoryModal />
              </div>

              {/* Categories cards */}
              <div className="space-y-2">
                {/* Categories */}
                <div>
                  <h2 className="text-2xl text-slate-800 font-bold mb-6">List of Categories and sub-categories</h2>
                  {/* Start */}
                  <div className="rounded-sm border border-slate-200">
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full divide-y divide-slate-200">
                        {items2.map((item) => {
                          return (
                            <AccordionTableRichItem
                              key={item.id}
                              id={item.id}
                              image={item.image}
                              customer={item.customer}
                              email={item.email}
                              location={item.location}
                              date={item.date}
                              amount={item.amount}
                              descriptionTitle={item.descriptionTitle}
                              descriptionBody={item.descriptionBody}
                            />
                          );
                        })}
                      </table>
                    </div>
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

export default Categories;
