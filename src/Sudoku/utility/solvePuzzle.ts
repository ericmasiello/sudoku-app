/*
 * Credit: This solution is heavily inspired by this video https://www.youtube.com/watch?v=3_50lwD7ygE
 */
type BoardValue = number | null;
export type Board = Array<Array<BoardValue>>;

export type SolutionResult =
  | {
      state: 'unsolved';
    }
  | {
      state: 'solved';
      board: Board;
    };

/*
 * Public API that takes a Board and returns a SolutionResult
 */
export function solve(board: Board): SolutionResult {
  const solution = solver(board);

  if (!solution) {
    return {
      state: 'unsolved',
    };
  }
  return {
    state: 'solved',
    board: solution,
  };
}

/*
 * Recursive entry point for solving the sudoku puzzle
 */
function solver(board: Board): Board | false {
  if (solved(board)) {
    return board;
  } else {
    const possibilities = nextBoards(board);
    const validBoards = keepOnlyValid(possibilities);
    return searchForSolution(validBoards);
  }
}

/*
 * Finds a valid solution to the sudoku problem
 * using a backtracking algorithm
 */
function searchForSolution(boards: Board[]): Board | false {
  if (boards.length < 1) {
    return false;
  } else {
    // backtracking search for solution
    const firstBoard = boards.shift() as Board;
    const solvedBoardOrFalse = solver(firstBoard);
    if (solvedBoardOrFalse !== false) {
      return solvedBoardOrFalse;
    } else {
      return searchForSolution(boards);
    }
  }
}

/*
 * Verifies if the board is solved by
 * checking for any null fields
 */
function solved(board: Board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return false;
      }
    }
  }

  return validateBoard(board);
}

/*
 * Finds the first empty square and generates 9 different boards
 * filling in that square with numbers 1...9
 */
function nextBoards(board: Board) {
  const boards: Board[] = [];
  const firstEmpty = findEmptySquare(board);
  if (firstEmpty !== undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];
    for (let i = 1; i <= 9; i++) {
      const newBoard: Board = [...board];
      const row = [...newBoard[y]];
      row[x] = i;
      newBoard[y] = row;
      boards.push(newBoard);
    }
  }

  return boards;
}

/*
 * Locates the [i,j] coordinates for the first empty square
 */
function findEmptySquare(board: Board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === null) {
        return [i, j];
      }
    }
  }
}

/*
 * Filters out all of the invalid boards from the list
 */
function keepOnlyValid(boards: Board[]) {
  const validBoards: Board[] = [];
  for (let i = 0; i < boards.length; i++) {
    if (validateBoard(boards[i])) {
      validBoards.push(boards[i]);
    }
  }
  return validBoards;
}

/*
 * Validates the board has a valid solution
 */
function validateBoard(board: Board) {
  return (
    validateBoardRows(board) &&
    validateBoardColumns(board) &&
    validateBoardBoxes(board)
  );
}
/*
 * Validates all the board's rows are valid
 */
function validateBoardRows(board: Board) {
  for (let i = 0; i < 9; i++) {
    const values: BoardValue[] = [];
    for (let j = 0; j < 9; j++) {
      const value = board[i][j];
      if (values.includes(value)) {
        return false;
      } else if (value !== null) {
        values.push(value);
      }
    }
  }
  return true;
}

/*
 * Validates all the board's columns are valid
 */
function validateBoardColumns(board: Board) {
  for (let i = 0; i < 9; i++) {
    const values: BoardValue[] = [];
    for (let j = 0; j < 9; j++) {
      const value = board[j][i];
      if (values.includes(value)) {
        return false;
      } else if (value != null) {
        values.push(value);
      }
    }
  }
  return true;
}

/*
 * Validates all the board's boxes are valid
 */
function validateBoardBoxes(board: Board) {
  const boxCoordinates = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];

  for (let y = 0; y < 9; y += 3) {
    for (let x = 0; x < 9; x += 3) {
      // each traversal should examine each box
      const values: BoardValue[] = [];
      for (let i = 0; i < 9; i++) {
        const coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += x;

        const value = board[coordinates[0]][coordinates[1]];

        if (values.includes(value)) {
          return false;
        } else if (value != null) {
          values.push(value);
        }
      }
    }
  }
  return true;
}
