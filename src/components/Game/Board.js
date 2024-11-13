import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import "./Game.css";

const createBoard = (rows, cols, mines) => {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isRevealed: false,
      isMine: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      placedMines++;
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isMine) {
        board[row][col].adjacentMines = countAdjacentMines(board, row, col);
      }
    }
  }

  return board;
};

const countAdjacentMines = (board, row, col) => {
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
  return directions.reduce((count, [dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      board[newRow] &&
      board[newRow][newCol] &&
      board[newRow][newCol].isMine
    ) {
      count++;
    }
    return count;
  }, 0);
};

export default function Board({ rows, cols, mines }) {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(false);

  const revealedState = { unclicked: 0, clicked: 1, flagged: 2 };
  const boardState = { bomb: 0, empty: 1, number: 2 };

  const [currentState, setCurrentState] = useState(0);
  const state = { unselected: 0, selected_safe: 1, selected_bomb: 2 };

  // const toggleSelection = () => {
  //   setSelected((selected) => !selected);
  //   setSelectedCount((count) => (selected ? count - 1 : count + 1));
  // };

  useEffect(() => {
    console.log("useeffect rows", rows);
    setBoard(createBoard(rows, cols, mines));
  }, [rows, cols, mines]);

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

  const handleCellHover = (row, col) => {
    const newBoard = board.slice();
    newBoard[row][col].isHovered = true;
    setBoard(newBoard);
  };

  const handleCellHoverOut = (row, col) => {
    const newBoard = board.slice();
    newBoard[row][col].isHovered = false;
    setBoard(newBoard);
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
      {/* className="cell" onClick={toggleSelection}
      style={{ backgroundColor: selected ? "black" : "white" }} */}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <Cell
                // key={cellIndex}
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
