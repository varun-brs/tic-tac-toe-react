import React, { useState } from "react";
import "./styles.css";

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

function App() {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [turnO, setTurnO] = useState(true);
  const [winner, setWinner] = useState(null);
  const [count, setCount] = useState(0);
  const boxesOfGame = document.getElementsByClassName("box");

  const handleClick = (index) => {
    if (boxes[index] !== "" || winner) return;

    const newBoxes = boxes.slice();

    newBoxes[index] = turnO ? "O" : "X";
    if (newBoxes[index] === "X") {
      boxesOfGame[index].style.color = "red";
    } else {
      boxesOfGame[index].style.color = "green";
    }

    setBoxes(newBoxes);
    setTurnO(!turnO);
    setCount(count + 1);

    const isWinner = checkWinner(newBoxes);
    if (!isWinner && count + 1 === 9) setWinner("Draw");
  };

  const checkWinner = (boxes) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        setWinner(boxes[a]);
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(""));
    setTurnO(true);
    setWinner(null);
    setCount(0);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      {winner && (
        <div className="msg-container ">
          <p>
            {winner === "Draw" ? "Game was a Draw." : `Winner is ${winner}`}
          </p>
          <button onClick={resetGame}>New Game</button>
        </div>
      )}
      <div className="game">
        {boxes.map((box, index) => (
          <button
            key={index}
            className="box "
            onClick={() => handleClick(index)}
          >
            {box}
          </button>
        ))}
      </div>
      {!winner && (
        <button id="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      )}
    </div>
  );
}

export default App;
