import type {
  Puzzle,
  PuzzleColumnKey,
  PuzzleKey,
  PuzzleRowKey,
  PuzzleValue,
} from '../sudokuTypes';

const PUZZLE_COLUMN_KEYS: PuzzleColumnKey[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
];
const PUZZLE_ROW_KEYS: PuzzleRowKey[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];

export const fillPartialPuzzle = (puzzle: Partial<Puzzle>): Puzzle => {
  for (const column of PUZZLE_COLUMN_KEYS) {
    for (const row of PUZZLE_ROW_KEYS) {
      const key: PuzzleKey = `${column}${row}`;
      if (!puzzle[key]) {
        puzzle[key] = null;
      }
    }
  }

  return puzzle as Puzzle;
};

export const sortPuzzle = (puzzle: Puzzle): Puzzle => {
  // sorts the puzzle by column, then row
  const sortedKeys = Object.keys(puzzle).sort((a, b) =>
    a.split('').reverse().join() < b.split('').reverse().join() ? -1 : 1
  ) as PuzzleKey[];

  const initialPuzzle: Partial<Puzzle> = {};

  return sortedKeys.reduce((acc, key) => {
    acc[key] = puzzle[key];
    return acc;
  }, initialPuzzle) as Puzzle;
};

export const convertFormToPuzzle = (form: HTMLFormElement): Puzzle => {
  const formData = new FormData(form);
  const initialState: Record<any, any> = {};
  const formObject = Object.keys(Object.fromEntries(formData)).reduce(
    (acc, key) => {
      acc[key] = formData.get(key)?.toString() ?? '';
      return acc;
    },
    initialState
  );

  if (!isValidPuzzle(formObject)) {
    throw new Error('Invalid puzzle');
  }

  return formObject;
};

const isValidPuzzle = (object: Record<any, any>): object is Puzzle => {
  const totalValidKeys = PUZZLE_COLUMN_KEYS.length * PUZZLE_ROW_KEYS.length;
  const keys = Object.getOwnPropertyNames(object);
  // verify we have the right number of keys
  if (keys.length !== totalValidKeys) {
    return false;
  }
  // verify we have all the keys we expect
  for (const column of PUZZLE_COLUMN_KEYS) {
    for (const row of PUZZLE_ROW_KEYS) {
      if (object[`${column}${row}`] === undefined) {
        return false;
      }
    }
  }

  return true;
};

/*

Given this data structure:

{"A1":"2","A2":"3","A6":"5","B5":"9","B6":"7","B8":"4","C3":"7","C9":"2","D2":"6","D4":"5","D5":"8","E1":"8","E3":"9","E6":"3","E8":"1","E9":"6","F7":"8","F8":"9","F9":"5","G2":"2","G3":"3","G4":"6","G5":"7","G8":"5","G9":"4","H4":"4","H6":"2","H8":"7","H9":"9","I1":"7","I3":"6","I4":"9","I6":"1","D3":"1","F6":"4"}

The visual board looks like this:

- - - - - - - - - - -
2 . . | . 8 . | . . 7
3 . . | 6 . . | 2 . .
. . 7 | 1 9 . | 3 . 6
- - - - - - - - - - -
. . . | 5 . . | 6 4 9
. 9 . | 8 . . | 7 . .
5 7 . | . 3 4 | . 2 1
- - - - - - - - - - -
. . . | . . 8 | . . .
. 4 . | . 1 9 | 5 7 .
. . 2 | . 6 5 | 4 9 .

We must convert it into a 2D array of strings where empty spots are represented by an empty string
with the following shape

[
  ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'],
  ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
  ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3'],
  ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'],
  ...
  ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9'],
]

which translates to (note: ignore the whitespace)
[
  ['2', ' ', ' ', ' ', '8', ' ', ' ', ' ', '7'],
  ['3', ' ', ' ', '6', ' ', ' ', '2', ' ', ' '],
  [' ', ' ', '7', '1', '9', ' ', '3', ' ', '6'],
  ...
  [' ', ' ', '2', ' ', '6', '5', '4', '9', ' '],
]

[
  1: []
]

*/

export const convertPuzzleTo2DArray = (
  puzzle: Puzzle
): Array<Array<number | null>> => {
  const puzzleArray: Array<Array<number | null>> = [];

  for (let rowIndex = 0; rowIndex < PUZZLE_ROW_KEYS.length; rowIndex++) {
    const rowKey = PUZZLE_ROW_KEYS[rowIndex];
    puzzleArray.push([]);

    for (
      let columnIndex = 0;
      columnIndex < PUZZLE_COLUMN_KEYS.length;
      columnIndex++
    ) {
      const columnKey = PUZZLE_COLUMN_KEYS[columnIndex];

      const value: string | null = puzzle[`${columnKey}${rowKey}`];

      if (value === '' || value === null) {
        puzzleArray[rowIndex].push(null);
      } else {
        puzzleArray[rowIndex].push(parseInt(value));
      }
    }
  }

  return puzzleArray;
};

export const convert2DArrayToPuzzle = (
  arr: Array<Array<number | null>>
): Puzzle => {
  const puzzle: Partial<Puzzle> = {};

  for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
    const row = arr[rowIndex];

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const columnKey = PUZZLE_COLUMN_KEYS[columnIndex];
      const rowKey = PUZZLE_ROW_KEYS[rowIndex];
      const key: PuzzleKey = `${columnKey}${rowKey}`;
      let value: PuzzleValue | null = null;

      if (row[columnIndex] !== null) {
        value = row[columnIndex]?.toString() as PuzzleValue;
      }

      puzzle[key] = value;
    }
  }

  return puzzle as Puzzle;
};

/*
  Given the the structure...
  'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1',
  'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2',
  'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3',
  'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4',
  ...
  'A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9',

  We want to create

  [
    [ 'A1', 'B1', 'C1',
      'A2', 'B2', 'C2',
      'A3', 'B3', 'C3',
    ],
    [ 'D1', 'E1', 'F1',
      'D2', 'E2', 'F2',
      'D3', 'E3', 'F3',
    ],
    [ 'G1', 'H1', 'I1',
      'G2', 'H2', 'I2',
      'G3', 'H3', 'I3',
    ],

    [ 'A4', 'B4', 'C4',
      'A5', 'B5', 'C5',
      'A6', 'B6', 'C6',
    ],

    ...
  ]
 */
export const createBlocksKeys = (): PuzzleKey[][] => {
  const blocks: PuzzleKey[][] = [];

  for (let i = 0; i < 9; i += 3) {
    const columns = PUZZLE_COLUMN_KEYS.slice(i, i + 3); // gives you back ['A', 'B', 'C'], then ['D', 'E', 'F'], etc.

    for (let j = 0; j < 9; j += 3) {
      blocks.push([]);

      const rows = PUZZLE_ROW_KEYS.slice(j, j + 3); // gives you back ['1', '2', '3'], then ['4', '5', '6'], etc.

      for (const row of rows) {
        for (const column of columns) {
          blocks[blocks.length - 1].push(`${column}${row}`);
        }
      }
    }
  }

  return blocks;
};

export const createRowKeys = (): PuzzleKey[][] => {
  const rows: PuzzleKey[][] = [];

  for (const number of PUZZLE_ROW_KEYS) {
    rows.push([]);
    for (const letter of PUZZLE_COLUMN_KEYS) {
      rows[rows.length - 1].push(`${letter}${number}`);
    }
  }

  return rows;
};

export const createColumnKeys = (): PuzzleKey[][] => {
  const columns: PuzzleKey[][] = [];

  for (const letter of PUZZLE_COLUMN_KEYS) {
    columns.push([]);
    for (const number of PUZZLE_ROW_KEYS) {
      columns[columns.length - 1].push(`${letter}${number}`);
    }
  }

  return columns;
};

const getInvalidKeysOfSubPuzzle = (
  puzzle: Puzzle,
  keys: PuzzleKey[]
): PuzzleKey[] => {
  const invalidKeys: PuzzleKey[] = [];
  const values: number[] = [];

  for (const key of keys) {
    const value = parseInt(puzzle[key] ?? '');
    if (
      value === null ||
      value === undefined ||
      Number.isNaN(value) ||
      value < 1 ||
      value > 9
    ) {
      invalidKeys.push(key);
    } else {
      values.push(value);
    }
  }

  if (invalidKeys.length > 0) {
    return invalidKeys;
  }

  // validate that the values are unique
  if (values.length !== new Set(values).size) {
    // return all keys as invalid
    return keys;
  }

  return [];
};

export const validatePuzzle = (
  puzzle: Puzzle
):
  | {
      state: 'valid';
    }
  | {
      state: 'invalid';
      invalidKeys: PuzzleKey[];
    } => {
  const blockKeysList = createBlocksKeys();
  const rowKeysList = createRowKeys();
  const columnKeysList = createColumnKeys();

  const invalidKeySet = new Set<PuzzleKey>();

  for (const keyGroups of [
    ...blockKeysList,
    ...rowKeysList,
    ...columnKeysList,
  ]) {
    const result = getInvalidKeysOfSubPuzzle(puzzle, keyGroups);
    result.forEach((key) => invalidKeySet.add(key));
  }

  if (invalidKeySet.size === 0) {
    return {
      state: 'valid',
    };
  }

  return {
    state: 'invalid',
    invalidKeys: Array.from(invalidKeySet),
  };
};
