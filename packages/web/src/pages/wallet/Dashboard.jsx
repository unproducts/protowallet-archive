import React, { useState } from 'react';

import Sidebar from '../../partials/wallet/Sidebar';
import Header from '../../partials/Header';
import Datepicker from '../../components/Datepicker';
import DateSelect from '../../components/DateSelect';
import AnalyticsCard01 from '../../partials/analytics/AnalyticsCard01';
import AnalyticsCard02 from '../../partials/analytics/AnalyticsCard02';
import AnalyticsCard03 from '../../partials/analytics/AnalyticsCard03';
import AnalyticsCard04 from '../../partials/analytics/AnalyticsCard04';
import AnalyticsCard05 from '../../partials/analytics/AnalyticsCard05';
import AnalyticsCard06 from '../../partials/analytics/AnalyticsCard06';
import AnalyticsCard07 from '../../partials/analytics/AnalyticsCard07';
import AnalyticsCard08 from '../../partials/analytics/AnalyticsCard08';
import AnalyticsCard09 from '../../partials/analytics/AnalyticsCard09';
import AnalyticsCard10 from '../../partials/analytics/AnalyticsCard10';
import AnalyticsCard11 from '../../partials/analytics/AnalyticsCard11';
import DashboardCard09 from '../../partials/dashboard/DashboardCard09';
import DashboardCard11 from '../../partials/dashboard/DashboardCard11';

/*TO DO: [UI] fix the flex box issue with date select and picker*/

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateSelectedType, setDateSelectedType] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Welcome back, XXXX!</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Datepicker built with flatpickr */}
                <div align="right">
                  {/* <div className="text-sm text-slate-800 font-medium">Date</div> */}
                  <DateSelect onChange={setDateSelectedType}></DateSelect>
                  <br />
                  {dateSelectedType === 'Custom' ? (
                    <div>
                      {/* <div className="text-sm text-slate-800 font-medium">Custom Date</div> */}
                      <Datepicker setSelectedStartDate={setSelectedStartDate} setSelectedEndDate={setSelectedEndDate}></Datepicker>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Analytics) */}
              <AnalyticsCard01 />
              {/*  Line chart (Active Users Right Now) */}
              <AnalyticsCard02 />
              {/* Report card (Top Channels) */}
              <AnalyticsCard05 />
              {/* Report card (Top Pages) */}
              <AnalyticsCard06 />
              {/* Doughnut chart (Visit By Age Category) */}
              <AnalyticsCard09 />
              {/* Polar chart (Sessions By Gender)
              <AnalyticsCard10 /> */}
              {/* Table (Top Products) */}
              <DashboardCard11 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
