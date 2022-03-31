import type {
  Puzzle2DIndex,
  Puzzle2DValue,
  Puzzle,
  PuzzleMap,
  PuzzleMapColumn,
  PuzzleMapRow,
  PuzzleKey,
} from './puzzleTypes';

const isPuzzleIndex = (value: number): value is Puzzle2DIndex => {
  return value >= 0 && value <= 8;
};
const isPuzzleValue = (value: number): value is Puzzle2DValue => {
  return value >= 1 && value <= 9;
};
const puzzleColumnToIndex = (column: PuzzleMapColumn): Puzzle2DIndex => {
  /*
   * 'A'.charCodeAt(0) === 65
   * 'B'.charCodeAt(0) === 66
   * Given the numeric succession of these values, we can use the index charCode
   * value of 'A' as on offset to return a numeric value for each letter.
   *
   * e.g.
   * // column === 'A'
   * column.charCodeAt(0) - 'A'.charCodeAt(0) === 0
   *
   * // column === 'B'
   * column.charCodeAt(0) - 'A'.charCodeAt(0) === 1
   */
  const offset = 'A'.charCodeAt(0);
  const result = column.charCodeAt(0) - offset;
  if (!isPuzzleIndex(result)) {
    throw new Error(`Invalid column with value "${column}"`);
  }
  return result;
};
const convertPuzzleRowToIndex = (row: PuzzleMapRow): Puzzle2DIndex => {
  const rowIndex = Number(row) - 1;
  if (!isPuzzleIndex(rowIndex)) {
    throw new Error(`Invalid row with value "${row}"`);
  }
  return rowIndex;
};

const isValidPuzzleKey = (key: string): key is PuzzleKey => {
  return !!key.match(/^[A-I]{1}[1-9]{1}$/);
};

export const convertPuzzleMapTo2DArray = (puzzleMap: PuzzleMap): Puzzle => {
  /*
   * Creates an array of 9 columns and the fills the array with 9 rows.
   * All values are initialized to `null`.
   */
  const initialPuzzle: Puzzle = new Array(9)
    .fill(null)
    .map(() => new Array(9).fill(null));
  /*
   * Map over the puzzle map object,
   * convert the keys (e.g. 'A1') to a numeric column and row index,
   * and set the value in that 2D array.
   */
  return Object.entries(puzzleMap).reduce((acc, [key, value]) => {
    if (!isValidPuzzleKey(key)) {
      throw new Error(`Invalid puzzle map key "${key}"`);
    }

    const puzzleValue = Number(value);

    if (!isPuzzleValue(puzzleValue)) {
      throw new Error(`Invalid puzzle map value "${value}" for key "${key}"`);
    }

    // can safely type alias this since we know `key` is a valid PuzzleKey
    const [column, row] = key.split('') as [PuzzleMapColumn, PuzzleMapRow];
    const columnIndex = puzzleColumnToIndex(column);
    const rowIndex = convertPuzzleRowToIndex(row);

    acc[columnIndex][rowIndex] = puzzleValue;

    return acc;
  }, initialPuzzle);
};
