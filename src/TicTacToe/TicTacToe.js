import React, { useState } from "react";

const TicTacToe = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  const declareWinner = (squares) => {
    let winSpots = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let index = 0; index < winSpots.length; index++) {
      if (
        squares[winSpots[index][0]] === "x" &&
        squares[winSpots[index][1]] === "x" &&
        squares[winSpots[index][2]] === "x"
      ) {
        setWinner("x");
      } else if (
        squares[winSpots[index][0]] === "o" &&
        squares[winSpots[index][1]] === "o" &&
        squares[winSpots[index][2]] === "o"
      ) {
        setWinner("o");
      }
    }
  };

  const handleClick = (num) => {
    if (cells[num] === "") {
      let squares = [...cells];
      if (turn === "x") {
        squares[num] = "x";
        setTurn("o");
      } else {
        setTurn("x");
        squares[num] = "o";
      }
      setCells(squares);
      declareWinner(squares);
    }
  };

  const Cell = ({ num }) => {
    return (
      <div class="box" onClick={() => handleClick(num)}>
        {cells[num]}
      </div>
    );
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
          <Cell num={0} />
          <Cell num={1} />
          <Cell num={2} />
          <Cell num={3} />
          <Cell num={4} />
          <Cell num={5} />
          <Cell num={6} />
          <Cell num={7} />
          <Cell num={8} />
        </div>
        {winner && (
          <>
            <div class="win-prompt">
              <h2>
                {" "}
                Winner:
                <span style={{ color: "red" }}> {winner} </span>
              </h2>
            </div>
          </>
        )}
        <div class="action-list"></div>
      </div>
    </div>
  );
};

export default TicTacToe;
