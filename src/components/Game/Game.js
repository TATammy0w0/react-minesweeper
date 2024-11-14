import Board from "./Board";
function Game({ size, mines }) {
  return (
    <div>
      <Board rows={size} cols={size} mines={mines} />
    </div>
  );
}

export default Game;
