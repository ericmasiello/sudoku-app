const nextEmptySpot = (board: number[][]) => {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
};

// TODO: can this be repurposed for the validate function?
const checkValue = (
  board: number[][],
  row: number,
  column: number,
  value: number
) => {
  if (
    checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    checkSquare(board, row, column, value)
  ) {
    return true;
  }

  return false;
};

const checkRow = (board: number[][], row: number, value: number) => {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
};

const checkColumn = (board: number[][], column: number, value: number) => {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
};

const checkSquare = (
  board: number[][],
  row: number,
  column: number,
  value: number
) => {
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(column / 3) * 3;

  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === value) return false;
    }
  }

  return true;
};

export const solve = (board: number[][]) => {
  let emptySpot = nextEmptySpot(board);
  let row = emptySpot[0];
  let col = emptySpot[1];

  // there is no more empty spots
  if (row === -1) {
    return board;
  }

  for (let num = 1; num <= 9; num++) {
    if (checkValue(board, row, col, num)) {
      board[row][col] = num;
      solve(board);
    }
  }

  if (nextEmptySpot(board)[0] !== -1) {
    board[row][col] = 0;
  }
  return board;
};
