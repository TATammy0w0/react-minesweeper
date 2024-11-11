import "./Game.css";
import React, { useContext, useState } from "react";

export default function Cell() {
  const [selected, setSelected] = useState(false);
  const revealedState = { unclicked: 0, clicked: 1, flagged: 2 };
  const boardState = { bomb: 0, empty: 1, number: 2 };

  const [currentState, setCurrentState] = useState(0);
  const state = { unselected: 0, selected_safe: 1, selected_bomb: 2 };

  const toggleSelection = () => {
    setSelected((selected) => !selected);
  };

  return (
    <div
      className="cell"
      //onClick={toggleSelection}
      style={{ backgroundColor: selected ? "black" : "white" }}
    >
      {/* {cell.isRevealed && cell.isMine
        ? "💣"
        : cell.adjacentMines > 0
        ? cell.adjacentMines
        : ""} */}
    </div>
  );
}
