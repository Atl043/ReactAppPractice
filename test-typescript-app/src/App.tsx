import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ApiClient from './clients/api-client';

function App() {
  const [catFact, setCatFact] = useState<string>('');
  const [catLength, setCatLength] = useState<number>(0);
  useEffect(()=> {
    getCatFact();
    async function getCatFact() {
      const catfact = await ApiClient.getCatFact()
      setCatFact(catfact.fact);
      setCatLength(catfact.length);
    }
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          {catFact}
        </p>
        <p>
          {catLength}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
