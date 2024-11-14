import "./Game.css";
import React, { useContext, useState } from "react";

export default function Cell({
  cell,
  onClick,
  onRightClick,
  onHover,
  onHoverOut,
}) {
  return (
    <div
      className={`cell ${
        cell.isRevealed
          ? cell.isMine
            ? "selected-bomb"
            : "selected-safe"
          : "unselected"
      } ${cell.isHovered ? "hover" : ""}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
      onContextMenu={(e) => {
        e.preventDefault(); // avoid opening up the default context menu
        onRightClick();
      }}
    >
      {cell.isRevealed
        ? cell.isMine
          ? "X"
          : cell.adjacentMines
        : cell.isFlagged
        ? "🚩"
        : ""}
    </div>
  );
}
