import React, { useEffect, useState } from "react";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill("")); // initialize 9 empty squares
  const [isXturn, setIsXturn] = useState(true);
  const [status, setStatus] = useState("");

  function getwinner(square) {
    const winningpatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningpatterns.length; i++) {
      const [x, y, z] = winningpatterns[i];
      if (
        square[x] &&
        square[x] === square[y] &&
        square[x] === square[z]
      ) {
        return square[x];
      }
    }
    return null;
  }

  function handleClick(getCurrentSquare) {
    let copySquares = [...squares];

    // If the clicked square is already filled, do nothing
    if (copySquares[getCurrentSquare] || getwinner(copySquares)) return;

    // Set the current player's mark ("X" or "O")
    copySquares[getCurrentSquare] = isXturn ? "X" : "O";

    // Update the state with the new squares
    setSquares(copySquares);

    // Toggle the turn
    setIsXturn(!isXturn);
  }

  function handlereset(){
    setIsXturn(true);
    setSquares(Array(9).fill(""))

  }

  useEffect(() => {
    if (!getwinner(squares) && squares.every((item) => item !== "")) {
      setStatus(`This is a draw ! please restart the game`);
    } else if (getwinner(squares)) {
      setStatus(`Winner is ${getwinner(squares)}. please restart`);
    } else {
      setStatus(`Next player is ${isXturn ? "X" : "O"}`);
    }
  }, [squares, isXturn]);

  return (
    <div className="game-container">
      <div className="game-title">
        Tic Tac Toe Game In <span>React</span>
      </div>
      <div className="game-board">
        <div className="row">
          <button value={squares[0]} onClick={() => handleClick(0)}>
            {squares[0]}
          </button>
          <button value={squares[1]} onClick={() => handleClick(1)}>
            {squares[1]}
          </button>
          <button value={squares[2]} onClick={() => handleClick(2)}>
            {squares[2]}
          </button>
        </div>
        <div className="row">
          <button value={squares[3]} onClick={() => handleClick(3)}>
            {squares[3]}
          </button>
          <button value={squares[4]} onClick={() => handleClick(4)}>
            {squares[4]}
          </button>
          <button value={squares[5]} onClick={() => handleClick(5)}>
            {squares[5]}
          </button>
        </div>
        <div className="row">
          <button value={squares[6]} onClick={() => handleClick(6)}>
            {squares[6]}
          </button>
          <button value={squares[7]} onClick={() => handleClick(7)}>
            {squares[7]}
          </button>
          <button value={squares[8]} onClick={() => handleClick(8)}>
            {squares[8]}
          </button>
        </div>
      </div>
      <h1>{status}</h1>
      <button onClick={handlereset} className="reset">Restart</button>
    </div>
  );
};

export default Board;

