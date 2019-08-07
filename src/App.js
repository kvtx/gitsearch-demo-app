import React from 'react';
import './App.css';
import Query from './services/query';

function App() {
  let q = new Query();
  q.makeQuery('search');
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Made CAll
        </p>
      </header>
    </div>
  );
}

export default App;
