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

  grid[row][col] = nextSymbol;
  renderGrid();

  if (nextSymbol !== null && !isValidPlacement(row, col, nextSymbol)) {
    setTimeout(() => cellDiv.classList.add("invalid-move"), 2500);
    setTimeout(() => {
      grid[row][col] = null;
      cellDiv.classList.remove("invalid-move");
      renderGrid();
    }, 3000);
  }
};

const reset = () => {
  grid = createGrid();
  renderGrid();
};

document.getElementById("reset").onclick = reset;

const checkWinCondition = () => {
  if (grid.flat().includes(null)) return false;
  for (let i = 0; i < 8; i++) {
    if (countSymbols(i, true, "🥭") !== 4 || countSymbols(i, true, "🪰") !== 4 || countSymbols(i, false, "🥭") !== 4 || countSymbols(i, false, "🪰") !== 4) {
      return false;
    }
  }
  return true;
};

renderGrid();

const EMPTY = null;
const MANGO = "🥭";
const FLY = "🪰";

function generatePuzzle(grid) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (grid[row][col] === EMPTY) {
        const values = [MANGO, FLY];
        shuffleArray(values);
        for (const value of values) {
          if (isValidPlacement(row, col, value)) {
            grid[row][col] = value;
            if (generatePuzzle(grid)) return true;
            grid[row][col] = EMPTY;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function hasUniqueSolution(grid) {
  let solutions = 0;
  function solve(currentGrid) {
    if (isComplete(currentGrid)) {
      solutions++;
      return solutions < 2;
    }
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (currentGrid[r][c] === EMPTY) {
          for (const v of [MANGO, FLY]) {
            if (isValidPlacement(r, c, v)) {
              currentGrid[r][c] = v;
              if (!solve(currentGrid)) return false;
              currentGrid[r][c] = EMPTY;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  return solve(grid.map(row => row.slice())) && solutions === 1;
}

function isComplete(grid) {
  return !grid.flat().includes(EMPTY);
}

function newPuzzle() {
  let attempts = 0;
  do {
    grid = createGrid();
    generatePuzzle(grid);
    attempts++;
  } while (!hasUniqueSolution(grid) && attempts < 10);
  renderGrid();
}

document.getElementById("newPuzzle").onclick = newPuzzle;
newPuzzle();
