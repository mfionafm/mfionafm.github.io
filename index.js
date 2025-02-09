console.log("JavaScript is working!");

// Create an 8x8 grid filled with empty cells
const createGrid = () => {
  return Array.from({ length: 8 }, () => Array(8).fill(null));
};

let grid = createGrid();

// Function to visualize the grid in the DOM
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
        cycleSymbol(rowIndex, colIndex);
        renderGrid();
      };

      rowDiv.appendChild(cellDiv);
    });

    gridContainer.appendChild(rowDiv);
  });
};

// Function to count symbols in a row or column
const countSymbols = (index, isRow, symbol) => {
  return grid.reduce((count, row, i) => count + (isRow ? row[index] === symbol : grid[i][index] === symbol), 0);
};

// Function to check if placement is valid
const isValidPlacement = (row, col, symbol) => {
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

// Function to cycle through symbols
const cycleSymbol = (row, col) => {
  const symbols = [null, "🥭", "🪰"];
  let currentIndex = symbols.indexOf(grid[row][col]);

  for (let i = 1; i < symbols.length; i++) {
    let nextIndex = (currentIndex + i) % symbols.length;
    let nextSymbol = symbols[nextIndex];
    if (nextSymbol === null || isValidPlacement(row, col, nextSymbol)) {
      grid[row][col] = nextSymbol;
      return;
    }
  }
};

// Function to reset the grid
const reset = () => {
  grid = createGrid();
  renderGrid();
};

document.getElementById("reset").onclick = reset;

// Function to check the win condition
const checkWinCondition = () => {
  if (grid.flat().includes(null)) return false;
  
  for (let i = 0; i < 8; i++) {
    if (countSymbols(i, true, "🥭") !== 4 || countSymbols(i, true, "🪰") !== 4 || countSymbols(i, false, "🥭") !== 4 || countSymbols(i, false, "🪰") !== 4) {
      return false;
    }
  }
  return true;
};

// Initialize the grid when the page loads
renderGrid();
