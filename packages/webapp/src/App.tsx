import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './ChartjsConfig';

import GeneralLayout from './components/GeneralLayout';
import Budgets from './components/budgets/budgets';
import Accounts from './components/accounts/accounts';
import Transactions from './components/transactions/Transactions';

function App() {

  const location = useLocation();

  useEffect(() => {
    console.log('location.pathname', location.pathname);
    if (document) {
      // @ts-ignore
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      // @ts-ignore
      document.querySelector('html').style.scrollBehavior = ''
    }
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <GeneralLayout>
        <Routes>
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </GeneralLayout>
    </>
  );
}

export default App;
