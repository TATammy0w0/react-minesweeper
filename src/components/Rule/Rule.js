function Rule() {
  return (
    <div>
      <h1>Rule</h1>

      <p>
        Minesweeper rules are very simple. The board is divided into cells, with
        mines randomly distributed. To win, you need to open all the cells. The
        number on a cell shows the number of mines adjacent to it. Using this
        information, you can determine cells that are safe, and cells that
        contain mines. Cells suspected of being mines can be marked with a flag
        using the right mouse button. To win a game of Minesweeper, all non-mine
        cells must be opened without opening a mine.
      </p>
    </div>
  );
}

export default Rule;
