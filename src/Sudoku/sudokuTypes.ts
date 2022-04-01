export type Difficulty = 'easy' | 'medium' | 'hard';

/*
 * API Types
 */
export type PuzzleColumnKey =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I';
export type PuzzleRowKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type PuzzleKey = `${PuzzleColumnKey}${PuzzleRowKey}`;
export type PuzzleValue = PuzzleRowKey | null;

export type Puzzle = Record<PuzzleKey, PuzzleValue>;
