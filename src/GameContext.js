import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children, size, mines }) => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [mineCount, setMineCount] = useState(mines);

  useEffect(() => {
    resetGame();
  }, []);

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

    // Handle the first click to ensure it's safe
    if (firstClick) {
      setFirstClick(false);
      if (newBoard[row][col].isMine) {
        swapMineWithSafeCell(newBoard, row, col);
      }
    }

    if (newBoard[row][col].isMine) {
      revealBoard(newBoard);
      setGameOver(true);
      //saveGame();
      return;
    }

    revealCell(newBoard, row, col);
    setBoard(newBoard);
    checkWin(newBoard);
    //saveGame();
  };

  const swapMineWithSafeCell = (board, mineRow, mineCol) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (!board[row][col].isMine) {
          // Swap mine with the first non-mine cell found
          board[row][col].isMine = true;
          board[mineRow][mineCol].isMine = false;

          // Update adjacent mine counts after the swap
          updateAdjacentMines(board);
          return;
        }
      }
    }
  };

  const updateAdjacentMines = (board) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (!board[row][col].isMine) {
          board[row][col].adjacentMines = countAdjacentMines(board, row, col);
        }
      }
    }
  };

  const handleRightClick = (row, col) => {
    if (gameOver || gameWon || board[row][col].isRevealed) return;

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
    setMineCount((prev) => prev + (newBoard[row][col].isFlagged ? -1 : 1));
    //    saveGame();
  };

  const resetGame = () => {
    setBoard(createBoard(size, size, mines));
    setGameOver(false);
    setGameWon(false);
    setMineCount(mines);
    setFirstClick(true);
    //localStorage.removeItem("minesweeperGame");
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
