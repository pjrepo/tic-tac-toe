import React, { useState, useEffect } from "react";
import "./App.css";
import Square from "./components/Square";
import { winningCombinations } from "./components/WinCombinations";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  const checkWin = () => {
    winningCombinations.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  const checkTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  };

  useEffect(() => {
    checkWin();
    checkTie();

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  const restart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };

  useEffect(() => {
    if (result.state !== "none") {
      alert(`Game Finished! ${result.winner} won`);
      restart();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((symbol, i) => {
        if (i === square && symbol === "") return player;
        return symbol;
      })
    );
  };

  return (
    <div className="App">
      <h1 className="heading">TIC-TAC-TOE</h1>
      <div className="board">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="row" key={i}>
            {Array.from({ length: 3 }, (_, j) => (
              <Square
                symbol={board[3 * i + j]}
                chooseSquare={() => {
                  chooseSquare(3 * i + j);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
