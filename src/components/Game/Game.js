import React, { useState, useContext } from "react";
import Cell from "./Cell";
import "./Game.css";
import { GameContext } from "../../GameContext";

function Game() {
  const { board, setBoard, handleCellHover, handleCellHoverOut } =
    useContext(GameContext);

  const handleCellClick = (row, col) => {
    // if (gameOver || board[row][col].isFlagged || board[row][col].isRevealed)
    //   return;

    const newBoard = board.slice();
    newBoard[row][col].isRevealed = true;

    console.log(newBoard[row][col].adjacentMines);

    if (newBoard[row][col].isMine) {
      revealBoard(newBoard);
      //setGameOver(true);
    } else {
      setBoard(newBoard);
      //checkWin(newBoard);
    }
  };

  const revealCell = (board, row, col) => {
    const cell = board[row][col];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;

    if (cell.adjacentMines === 0) {
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (board[newRow] && board[newRow][newCol]) {
          revealCell(board, newRow, newCol);
        }
      });
    }
  };

  const revealBoard = (board) => {
    for (const row of board) {
      for (const cell of row) {
        cell.isRevealed = true;
      }
    }
  };

  return (
    <div>
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
                //onRightClick={() => handleRightClick(rowIndex, cellIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
