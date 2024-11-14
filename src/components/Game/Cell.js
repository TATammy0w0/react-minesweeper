import "./Game.css";
import React from "react";

export default function Cell({
  cell,
  onClick,
  onRightClick,
  onHover,
  onHoverOut,
}) {
  // change text color based on the number of adjacent mines
  const getTextColor = (count) => {
    switch (count) {
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "#fca605"; // bright orange
      case 4:
        return "purple";
      default:
        return "red";
    }
  };

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
      // Apply the color style only if the cell is revealed and has adjacent mines
      style={{
        color:
          cell.isRevealed && cell.adjacentMines > 0
            ? getTextColor(cell.adjacentMines)
            : "black",
      }}
    >
      {cell.isRevealed
        ? cell.isMine
          ? "💣"
          : cell.adjacentMines > 0
          ? cell.adjacentMines
          : "" // Show empty string if adjacentMines is 0
        : cell.isFlagged
        ? "🚩"
        : ""}
    </div>
  );
}
