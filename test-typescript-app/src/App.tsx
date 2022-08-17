import React, { useEffect, useState } from "react";
import "./App.css";
import ApiClient from "./clients/api-client";
import { test4 } from "./coding-interview-functions/deep-merge";
import Game from "./tic-tac-toe/tic-tac-toe";

function App() {
  const [catFact, setCatFact] = useState<string>("");
  const [catLength, setCatLength] = useState<number>(0);

  // immediately have a call to the api
  useEffect(() => {
    getCatFact();
    async function getCatFact() {
      const catfact = await ApiClient.getCatFact();
      setCatFact(catfact.fact);
      setCatLength(catfact.length);
    }
  }, []);

  console.log("deepMerge", test4);
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="box">Left div</div>
          <div className="box">Middle div</div>
          <div className="box">Right div</div>
        </div>
        <div>
            <Game></Game>
        </div>
        <p>{catFact}</p>
        <p>{catLength}</p>
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
