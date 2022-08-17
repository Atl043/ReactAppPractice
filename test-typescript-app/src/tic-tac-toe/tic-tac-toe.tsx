import React, { useState } from "react";
import "./tic-tac-toe.css";
function Square(props: {value: string, onClick: React.MouseEventHandler<HTMLButtonElement> | undefined}) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  interface iBoard {
  }

  function Board(props:iBoard) {
    const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState<boolean>(true);
  
    function handleClick(i: number) {
      const squaresSliced = squares.slice();
      if (calculateWinner(squaresSliced) || squaresSliced[i]) {
        return;
      }
      squaresSliced[i] = xIsNext ? 'X' : 'O';
      setSquares(squaresSliced);
      setXIsNext(!xIsNext);
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }
  
    function renderSquare(i: number) {
      return (
        <Square
          value={squares[i]}
          onClick={() =>handleClick(i)}
        />
      );
    }
  
      const winner = calculateWinner(squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div>
          <button className="" onClick={() => handleReset()}>
        Reset
      </button>
          </div>
        </div>
      );
    
  }
  
  export default function Game() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
  }

  function calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if(squares.every(x => x !== null)) {
        return "No Winner"
    }
    return null;
  }
  