// Create an 8x8 grid filled with empty cells
const createGrid = () => {
  const grid = [];
  for (let i = 0; i < 8; i++) {
    grid.push(new Array(8).fill(null)); // Each cell is null initially
  }
  return grid;
};

const grid = createGrid();

// Visualize the grid in the console
const printGrid = (grid) => {
  grid.forEach(row => {
    const rowString = row.map(cell => (cell === null ? "." : cell)).join(" ");
    console.log(rowString);
  });
  console.log("\n"); // Add a blank line for spacing
};

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

// Update isValidPlacement to include Rule 2
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

// Function to check if placement is valid


// Function to place a symbol in the grid
const placeSymbol = (grid, row, col, symbol) => {
  if (grid[row][col] === null) {
    if (isValidPlacement(grid, row, col, symbol)) {
      grid[row][col] = symbol; // Place the symbol
      console.log(`Placed ${symbol} at row ${row}, column ${col}`);
    } else {
      console.log(`Invalid placement for ${symbol} at row ${row}, column ${col}`);
    }
  } else {
    console.log(`Cell at row ${row}, column ${col} is already occupied!`);
  }
  printGrid(grid); // Reprint the grid
};

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



// Test cases

// Losing Test Grid
const losingGrid = [
  ["🥭", "🥭", "🪰", "🪰", "🥭", "🥭", "🪰", "🪰"],
  ["🪰", "🪰", "🥭", "🥭", "🪰", "🪰", "🥭", "🥭"],
  ["🥭", "🥭", "🪰", "🪰", "🥭", "🥭", "🪰", "🪰"],
  ["🪰", "🪰", "🥭", "🥭", "🪰", "🪰", "🥭", "🪰"], // Row with too many flies
  ["🥭", "🥭", "🪰", "🪰", "🥭", "🥭", "🪰", "🪰"],
  ["🪰", "🪰", "🥭", "🥭", "🪰", "🪰", "🥭", "🥭"],
  ["🥭", "🥭", "🪰", "🪰", "🥭", "🥭", "🪰", "🪰"],
  ["🪰", "🪰", "🥭", "🥭", "🪰", "🪰", "🥭", "🥭"]
];

// Test the win condition
printGrid(losingGrid); // Visualize the grid
if (checkWinCondition(losingGrid)) {
  console.log("Congratulations! You've completed the puzzle!");
} else {
  console.log("The puzzle is not yet complete.");
}


const winningGrid = [
  ["🥭", "🥭", "🪰", "🪰", "🥭", "🥭", "🪰", "🪰"],
  ["🪰", "🪰", "🥭", "🥭", "🪰", "🪰", "🥭", "🥭"],
  ["🥭", "🥭", "🪰", "🪰", "🥭", "🥭", "🪰", "🪰"],
  ["🪰", "🪰", "🥭", "🥭", "🪰", "🪰", "🥭", "🥭"],
  ["🥭", "🥭", "🪰", "🪰", "🥭", "🥭", "🪰", "🪰"],
  ["🪰", "🪰", "🥭", "🥭", "🪰", "🪰", "🥭", "🥭"],
  ["🥭", "🥭", "🪰", "🪰", "🥭", "🥭", "🪰", "🪰"],
  ["🪰", "🪰", "🥭", "🥭", "🪰", "🪰", "🥭", "🥭"]
];

// Test the win condition
printGrid(winningGrid); // Visualize the grid
if (checkWinCondition(winningGrid)) {
  console.log("Congratulations! You've completed the puzzle!");
} else {
  console.log("The puzzle is not yet complete.");
}
