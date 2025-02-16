console.log("JavaScript is working!");

// Create an 8x8 grid filled with empty cells
const createGrid = () => Array.from({ length: 8 }, () => Array(8).fill(null));

let grid = createGrid();

// Render grid to the DOM
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
      cellDiv.onclick = () => { cycleSymbol(rowIndex, colIndex, cellDiv); };
      rowDiv.appendChild(cellDiv);
    });
    gridContainer.appendChild(rowDiv);
  });
};

// Count symbols in a row/column
const countSymbolsInRow = (rowIndex, symbol) => grid[rowIndex].filter(cell => cell === symbol).length;
const countSymbolsInCol = (colIndex, symbol) => grid.reduce((count, row) => count + (row[colIndex] === symbol ? 1 : 0), 0);

// Validate placement: no more than 2 adjacent and total count less than 4
const isValidPlacement = (row, col, symbol) => {
  if (
    (col > 1 && grid[row][col - 1] === symbol && grid[row][col - 2] === symbol) ||
    (col < 6 && grid[row][col + 1] === symbol && grid[row][col + 2] === symbol) ||
    (col > 0 && col < 7 && grid[row][col - 1] === symbol && grid[row][col + 1] === symbol) ||
    (row > 1 && grid[row - 1][col] === symbol && grid[row - 2][col] === symbol) ||
    (row < 6 && grid[row + 1][col] === symbol && grid[row + 2][col] === symbol) ||
    (row > 0 && row < 7 && grid[row - 1][col] === symbol && grid[row + 1][col] === symbol)
  ) {
    return false;
  }
  return countSymbolsInRow(row, symbol) < 4 && countSymbolsInCol(col, symbol) < 4;
};

// Cycle through symbols until a valid move is found or all options are exhausted
const cycleSymbol = (row, col, cellDiv) => {
  const symbols = [null, "🥭", "🪰"];
  let currentIndex = symbols.indexOf(grid[row][col]);
  for (let i = 1; i <= symbols.length; i++) {
    let nextIndex = (currentIndex + i) % symbols.length;
    let nextSymbol = symbols[nextIndex];
    if (nextSymbol === null || isValidPlacement(row, col, nextSymbol)) {
      grid[row][col] = nextSymbol;
      renderGrid();
      return;
    }
  }
  cellDiv.classList.add("invalid-move");
  setTimeout(() => { cellDiv.classList.remove("invalid-move"); }, 1000);
};

const reset = () => {
  grid = createGrid();
  renderGrid();
};

document.getElementById("reset").onclick = reset;

const checkWinCondition = () => {
  if (grid.flat().includes(null)) return false;
  for (let i = 0; i < 8; i++) {
    if (countSymbolsInRow(i, "🥭") !== 4 || countSymbolsInRow(i, "🪰") !== 4) return false;
    if (countSymbolsInCol(i, "🥭") !== 4 || countSymbolsInCol(i, "🪰") !== 4) return false;
  }
  return true;
};

renderGrid();
