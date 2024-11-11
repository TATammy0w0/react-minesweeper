import Board from "./Board";
function Game({ rows, cols, mines }) {
  return (
    <div>
      <Board rows={rows} cols={cols} mines={mines} />
    </div>
  );
}

export default Game;
