export type Puzzle2DIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Puzzle2DValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type OptionalPuzzle2DValue = Puzzle2DValue | null;
export type PuzzleSquare = { value: OptionalPuzzle2DValue; id: PuzzleKey };
export type Puzzle = PuzzleSquare[][];

export type PuzzleMapColumn =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I';
export type PuzzleMapRow = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type PuzzleMapValue = PuzzleMapRow;

export type PuzzleKey = `${PuzzleMapColumn}${PuzzleMapRow}`;

/*
 * Making the PuzzleMap a Partial allows for missing keys. Otherwise, all
 * values 'A1' through 'I9' must be present.
 */
export type PuzzleMap = Partial<Record<PuzzleKey, PuzzleMapValue>>;

export type Difficulty = 'easy' | 'medium' | 'hard';

export type APIResponse = {
  difficulty: Difficulty;
  puzzle: PuzzleMap;
};
