// App.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { AppFooter } from '../src/components/general/AppFooter/AppFooter';
import { AppHeader } from '../src/components/general/AppHeader/AppHeader';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
