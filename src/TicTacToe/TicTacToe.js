import React, { useState } from "react";

const TicTacToe = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [history, setHistory] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const declareWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
      }
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== null || winner) {
      return;
    }

    let squares = [...cells];
    if (turn === "x") {
      squares[num] = "x";
      setTurn("o");
    } else {
      setTurn("x");
      squares[num] = "o";
    }
    setCells(squares);
    history.push(squares);
    declareWinner(squares);
  };

  const Square = ({ num }) => {
    return (
      <div class="box" onClick={() => handleClick(num)}>
        {cells[num]}
      </div>
    );
  };

  const moves = history.map((step, move) => {
    // return if history is null
    if (step === null) {
     return;
    }

    const desc = move ? "Go to move #" + (move - 9) : "Go to game start";
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const jumpTo = (move) => {
    setCells(history[move]);
    setTurn(move % 2 === 0 ? "x" : "o");
  };

  const resetGame = () => {
    setCells(Array(9).fill(null));
    setHistory(Array(9).fill(null));
    setWinner(null);
  };

  return (
    <div>
      <div class="wrapper">
        <div class="heading">
          <h1>Tic-Tac-Toe</h1>
        </div>
        <div class="prompt">
          <h2>
            Turn: <span style={{ color: "red" }}> {turn}</span>
          </h2>
        </div>
        <div class="grid-container">
          <Square num={0} />
          <Square num={1} />
          <Square num={2} />
          <Square num={3} />
          <Square num={4} />
          <Square num={5} />
          <Square num={6} />
          <Square num={7} />
          <Square num={8} />
        </div>
        {winner && (
          <>
            <div class="win-prompt">
              <h2>
                {" "}
                Winner:
                <span style={{ color: "red" }}> {winner} </span>
                <div class="playAgainBtn">
                  <button onClick={() => resetGame()}>Play Again</button>
                </div>
              </h2>
            </div>
          </>
        )}
        {winner === null && cells.every((cell) => cell !== null) && (
          <>
            <div class="win-prompt">
              <h2>
                {" "}
                Tie!
                <div class="playAgainBtn">

                  <button onClick={() => resetGame()}>Play Again</button>
                </div>
              </h2>
            </div>
          </>
        )}
        <div class="action-list">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
