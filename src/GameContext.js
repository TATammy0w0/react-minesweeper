import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children, size, mines, difficulty }) => {
  const [board, setBoard] = useState(createBoard(size, size, mines));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [mineCount, setMineCount] = useState(mines);

  const checkWin = (board) => {
    const won = board.every((row) =>
      row.every((cell) => cell.isRevealed || cell.isMine)
    );
    if (won) {
      setGameWon(true);
    }
  };

  const handleCellClick = (row, col) => {
    if (
      gameOver ||
      gameWon ||
      board[row][col].isFlagged ||
      board[row][col].isRevealed
    )
      return;

    const newBoard = [...board];

    // EXTRA CREDITS: safe first turn
    if (firstClick) {
      setFirstClick(false);
      if (newBoard[row][col].isMine) {
        swapMineWithSafeCell(newBoard, row, col);
      }
    }

    if (newBoard[row][col].isMine) {
      revealBoard(newBoard);
      setGameOver(true);
      return;
    }

    revealCell(newBoard, row, col);
    setBoard(newBoard);
    checkWin(newBoard);
  };

  // EXTRA CREDITS: safe first turn
  const swapMineWithSafeCell = (board, mineRow, mineCol) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (!board[row][col].isMine) {
          // Swap mine with the first non-mine cell found
          board[row][col].isMine = true;
          board[mineRow][mineCol].isMine = false;
          updateAdjacentMines(board);
          return;
        }
      }
    }
  };

  // EXTRA CREDITS: safe first turn
  const updateAdjacentMines = (board) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (!board[row][col].isMine) {
          board[row][col].adjacentMines = countAdjacentMines(board, row, col);
        }
      }
    }
  };

  // EXTRA CREDITS: flag bomb
  const handleRightClick = (row, col) => {
    if (gameOver || gameWon || board[row][col].isRevealed) return;

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
    setMineCount((prev) => prev + (newBoard[row][col].isFlagged ? -1 : 1));
  };

  const resetGame = () => {
    setBoard(createBoard(size, size, mines));
    setGameOver(false);
    setGameWon(false);
    setMineCount(mines);
    setFirstClick(true);
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

  return (
    <GameContext.Provider
      value={{
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

const revealCell = (board, row, col) => {
  const cell = board[row][col];
  if (cell.isRevealed || cell.isFlagged) return;

  cell.isRevealed = true;

  if (cell.adjacentMines === 0) {
    autoClear(board, row, col);
  }
};

const revealBoard = (board) => {
  for (const row of board) {
    for (const cell of row) {
      cell.isRevealed = true;
    }
  }
};

// EXTRA CREDITS: auto clear
const autoClear = (board, row, col) => {
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

    // check if within bounds and not already revealed
    if (
      board[newRow] &&
      board[newRow][newCol] &&
      !board[newRow][newCol].isRevealed
    ) {
      revealCell(board, newRow, newCol);
    }
  });
};
