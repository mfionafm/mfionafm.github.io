console.log("JavaScript is working!");

const createGrid = () => Array.from({ length: 8 }, () => Array(8).fill(null));
let grid = createGrid();

const renderGrid = () => {
  const gridContainer = document.getElementById("grid");
  gridContainer.innerHTML = "";

  grid.forEach((row, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell || "";

      cellDiv.onclick = () => {
        cycleSymbol(rowIndex, colIndex, cellDiv);
      };

      rowDiv.appendChild(cellDiv);
    });

    gridContainer.appendChild(rowDiv);
  });
};

const countSymbols = (index, isRow, symbol) => 
  grid.reduce((count, row, i) => count + (isRow ? row[index] === symbol : grid[i][index] === symbol), 0);

const isValidPlacement = (row, col, symbol) => {
  if (grid[row][col] === symbol) return true;
  if (
    (col > 1 && grid[row][col - 1] === symbol && grid[row][col - 2] === symbol) ||
    (col < 7 && grid[row][col + 1] === symbol && grid[row][col + 2] === symbol) ||
    (col > 0 && col < 7 && grid[row][col - 1] === symbol && grid[row][col + 1] === symbol) ||
    (row > 1 && grid[row - 1][col] === symbol && grid[row - 2][col] === symbol) ||
    (row < 7 && grid[row + 1][col] === symbol && grid[row + 2][col] === symbol) ||
    (row > 0 && row < 7 && grid[row - 1][col] === symbol && grid[row + 1][col] === symbol)
  ) {
    return false;
  }
  return countSymbols(row, true, symbol) < 4 && countSymbols(col, false, symbol) < 4;
};

const cycleSymbol = (row, col, cellDiv) => {
  const symbols = [null, "🥭", "🪰"];
  let currentIndex = symbols.indexOf(grid[row][col]);
  let nextIndex = (currentIndex + 1) % symbols.length;
  let nextSymbol = symbols[nextIndex];

  if (nextSymbol !== null && !isValidPlacement(row, col, nextSymbol)) {
    cellDiv.classList.add("invalid-move");
    setTimeout(() => {
      cellDiv.classList.remove("invalid-move");
    }, 3000);
    return;
  }

  grid[row][col] = nextSymbol;
  renderGrid();
};

const reset = () => {
  grid = createGrid();
  renderGrid();
};

document.getElementById("reset").onclick = reset;
renderGrid();
