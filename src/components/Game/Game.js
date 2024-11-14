import React, { useState, useContext } from "react";
import Cell from "./Cell";
import "./Game.css";
import { GameContext } from "../../GameContext";
import DifficultiesHeader from "./DifficultiesHeader";

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
    difficulty,
  } = useContext(GameContext);

  const dynamicLevel = (text) => text.toUpperCase();

  return (
    <div>
      <DifficultiesHeader />
      <div className="game-content-group">
        <h1>{dynamicLevel(difficulty)} MODE</h1>
        <div className="game-message">
          {gameOver ? "Game over :(" : gameWon ? "You won!" : ""}
        </div>
        <p>Mines Left: {mineCount}</p>

        <div className={`board ${difficulty === "hard" ? "hard-mode" : ""}`}>
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

        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}

export default Game;
