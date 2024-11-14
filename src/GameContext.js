import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children, size, mines }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(createBoard(size, size, mines));
  }, []);

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
  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        handleCellHover,
        handleCellHoverOut,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

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
