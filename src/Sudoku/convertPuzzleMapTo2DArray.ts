import type {
  Puzzle2DIndex,
  Puzzle2DValue,
  Puzzle,
  PuzzleMap,
  PuzzleMapColumn,
  PuzzleMapRow,
  PuzzleKey,
  PuzzleSquare,
} from './puzzleTypes';

const isPuzzleIndex = (value: number): value is Puzzle2DIndex => {
  return value >= 0 && value <= 8;
};
const isPuzzleValue = (value: number): value is Puzzle2DValue => {
  return value >= 1 && value <= 9;
};

const COLUMN_OFFSET = 'A'.charCodeAt(0);

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

  const result = column.charCodeAt(0) - COLUMN_OFFSET;
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

const convertToValidIds = (
  puzzle2DArray: { value: null; id: 'UNKNOWN' }[][]
): Puzzle => {
  return puzzle2DArray.map((row, rowIndex) => {
    return row.map((square, columnIndex): PuzzleSquare => {
      const key =
        String.fromCharCode(rowIndex + COLUMN_OFFSET) + (columnIndex + 1);
      if (!isValidPuzzleKey(key)) {
        throw new Error(`Invalid key with value "${key}"`);
      }

      return {
        id: key,
        value: square.value,
      };
    });
  });
};

export const convertPuzzleMapTo2DArray = (puzzleMap: PuzzleMap): Puzzle => {
  /*
   * Creates an array of 9 columns and the fills the array with 9 rows.
   * All values are initialized to `{ value: null, id: 'UNKNOWN' }`.
   *
   * Then we pass the array to the `convertToValidIds` to properly initialize each `id`
   */
  const initialPuzzle: Puzzle = convertToValidIds(
    new Array(9)
      .fill(null)
      .map(() => new Array(9).fill({ value: null, id: 'UNKNOWN' }))
  );
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

    acc[columnIndex][rowIndex].id = key;
    acc[columnIndex][rowIndex].value = puzzleValue;

    return acc;
  }, initialPuzzle);
};
