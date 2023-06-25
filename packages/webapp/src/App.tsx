import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

import GeneralLayout from './layouts/GeneralLayout';
import Budgets from './pages/budgets';

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
      </Routes>
    </GeneralLayout>
    </>
  );
}

export default App;
