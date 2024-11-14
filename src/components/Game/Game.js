import React, { useState, useContext } from "react";
import Cell from "./Cell";
import "./Game.css";
import { GameContext } from "../../GameContext";

function Game() {
  const {
    board,
    handleCellClick,
    handleRightClick,
    handleCellHover,
    handleCellHoverOut,
    gameOver,
    gameWon,
    resetGame,
    mineCount,
  } = useContext(GameContext);

  return (
    <div>
      <h1>Minesweeper</h1>
      <p>
        {gameOver
          ? "Game over! You lost!"
          : gameWon
          ? "Game over! You won!"
          : "Keep going!"}
      </p>
      <p>Mines Left: {mineCount}</p>
      <button onClick={resetGame}>Reset</button>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <Cell
                key={cellIndex}
                cell={cell}
                onHover={() => handleCellHover(rowIndex, cellIndex)}
                onHoverOut={() => handleCellHoverOut(rowIndex, cellIndex)}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
                onRightClick={() => handleRightClick(rowIndex, cellIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
