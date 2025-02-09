console.log("JavaScript is working!");

// Create an 8x8 grid filled with empty cells
const createGrid = () => {
  const grid = [];
  for (let i = 0; i < 8; i++) {
    grid.push(new Array(8).fill(null)); // Each cell is null initially
  }
  return grid;
};

const grid = createGrid();

// Function to visualize the grid in the DOM
const renderGrid = (grid) => {
  const gridContainer = document.getElementById("grid");
  gridContainer.innerHTML = ""; // Clear old grid

  grid.forEach((row, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell || " "; // Show 🥭, 🪰, or " "

      // Allow clicking a cell to cycle through symbols
      cellDiv.onclick = () => {
        cycleSymbol(grid, rowIndex, colIndex);
        renderGrid(grid); // Update the grid after placement
      };

      rowDiv.appendChild(cellDiv);
    });

    gridContainer.appendChild(rowDiv);
  });
};

// Function to count symbols in a row or column
const countSymbols = (grid, index, isRow, symbol) => {
  let count = 0;
  for (let i = 0; i < 8; i++) {
    if (isRow) {
      if (grid[index][i] === symbol) count++; // Count in row
    } else {
      if (grid[i][index] === symbol) count++; // Count in column
    }
  }
  return count;
};

// Function to check if placement is valid
const isValidPlacement = (grid, row, col, symbol) => {
  // Check Rule 1: No more than 2 adjacent symbols
  if (col > 1 && grid[row][col - 1] === symbol && grid[row][col - 2] === symbol) return false;
  if (col < 7 && grid[row][col + 1] === symbol && grid[row][col + 2] === symbol) return false;
  if (col > 0 && col < 7 && grid[row][col - 1] === symbol && grid[row][col + 1] === symbol) return false;

  if (row > 1 && grid[row - 1][col] === symbol && grid[row - 2][col] === symbol) return false;
  if (row < 7 && grid[row + 1][col] === symbol && grid[row + 2][col] === symbol) return false;
  if (row > 0 && row < 7 && grid[row - 1][col] === symbol && grid[row + 1][col] === symbol) return false;

  // Check Rule 2: No more than 4 of each symbol in row/column
  const rowCount = countSymbols(grid, row, true, symbol);
  const colCount = countSymbols(grid, col, false, symbol);
  if (rowCount >= 4 || colCount >= 4) return false;

  return true; // Placement is valid
};

// Function to cycle through symbols in a cell
const cycleSymbol = (grid, row, col) => {
  const symbols = [null, "🥭", "🪰"];
  const currentIndex = symbols.indexOf(grid[row][col]);
  const nextIndex = (currentIndex + 1) % symbols.length;
  grid[row][col] = symbols[nextIndex];
};

// Function to reset the game
const reset = () => {
  location.reload();
}

// Function to check the win condition
const checkWinCondition = (grid) => {
  // Check if the grid is fully filled
  for (let row of grid) {
    if (row.includes(null)) {
      return false; // There's at least one empty cell
    }
  }

  // Check each row and column for the correct symbol counts
  for (let i = 0; i < 8; i++) {
    const mangoRowCount = countSymbols(grid, i, true, "🥭");
    const flyRowCount = countSymbols(grid, i, true, "🪰");
    const mangoColCount = countSymbols(grid, i, false, "🥭");
    const flyColCount = countSymbols(grid, i, false, "🪰");

    if (mangoRowCount !== 4 || flyRowCount !== 4 || mangoColCount !== 4 || flyColCount !== 4) {
      return false; // A row or column doesn't have the correct count
    }
  }

  return true; // Grid is filled and valid
};

// Initialize the grid when the page loads
renderGrid(grid);
