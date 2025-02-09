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
        cycleSymbol(rowIndex, colIndex);
      };

      rowDiv.appendChild(cellDiv);
    });

    gridContainer.appendChild(rowDiv);
  });
};

const countSymbolsInRow = (row, symbol) => grid[row].filter(cell => cell === symbol).length;
const countSymbolsInCol = (col, symbol) => grid.reduce((count, row) => count + (row[col] === symbol ? 1 : 0), 0);

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
  return countSymbolsInRow(row, symbol) < 4 && countSymbolsInCol(col, symbol) < 4;
};

const cycleSymbol = (row, col) => {
  const symbols = [null, "🥭", "🪰"];
  let currentIndex = symbols.indexOf(grid[row][col]);
  let nextIndex = (currentIndex + 1) % symbols.length;
  let nextSymbol = symbols[nextIndex];
  let previousSymbol = grid[row][col];

  grid[row][col] = nextSymbol;
  renderGrid();

  if (nextSymbol !== null && !isValidPlacement(row, col, nextSymbol)) {
    let tempCell = document.getElementsByClassName("cell")[row * 8 + col];
    tempCell.classList.add("invalid-move");
    setTimeout(() => {
      grid[row][col] = previousSymbol;
      renderGrid();
      document.getElementsByClassName("cell")[row * 8 + col].classList.remove("invalid-move");
    }, 3000);
  }
};

const reset = () => {
  grid = createGrid();
  renderGrid();
};

document.getElementById("reset").onclick = reset;
renderGrid();

const runTests = () => {
  grid = createGrid();
  grid[0][0] = "🥭";
  grid[0][1] = "🥭";
  grid[0][2] = "🥭";
  console.assert(countSymbolsInRow(0, "🥭") === 3, "Row 0 should have 3 mangoes");
  console.assert(countSymbolsInCol(0, "🥭") === 1, "Col 0 should have 1 mango");
  console.assert(isValidPlacement(0, 3, "🥭") === true, "Placement at (0,3) should be valid");
  grid[0][3] = "🥭";
  console.assert(isValidPlacement(0, 4, "🥭") === false, "Placement at (0,4) should be invalid");
};

runTests();
