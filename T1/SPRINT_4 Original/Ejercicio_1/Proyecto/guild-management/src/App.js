// App.js

import React from 'react';
import MembersTable from './components/1_GuildMemberManagement/GuildMemberManagement';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Guild Management</h1>
      </header>
      <main>
        <MembersTable />
      </main>
    </div>
  );
}

export default App;