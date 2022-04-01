const MAX_VALUE = 9;

const nextEmptySpot = (board: string[][]): [number, number] => {
  for (let i = 0; i < MAX_VALUE; i++) {
    for (let j = 0; j < MAX_VALUE; j++) {
      if (board[i][j].trim() === '') return [i, j];
    }
  }
  return [-1, -1];
};

const checkValue = (
  board: string[][],
  row: number,
  column: number,
  value: string
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

const checkRow = (board: string[][], row: number, value: string) => {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  return true;
};

const checkColumn = (board: string[][], column: number, value: string) => {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  return true;
};

const checkSquare = (
  board: string[][],
  row: number,
  column: number,
  value: string
) => {
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(column / 3) * 3;

  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      if (board[boxRow + row][boxCol + column] === value) {
        return false;
      }
    }
  }

  return true;
};

export const solve = (board: string[][]) => {
  const [row, col] = nextEmptySpot(board);

  // there is no more empty spots
  if (row === -1) {
    return board;
  }

  for (let num = 1; num <= MAX_VALUE; num++) {
    if (checkValue(board, row, col, num.toString())) {
      board[row][col] = num.toString();
      solve(board);
    }
  }

  if (nextEmptySpot(board)[0] !== -1) {
    board[row][col] = '';
  }
  return board;
};
