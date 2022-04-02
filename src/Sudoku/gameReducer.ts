import type { Difficulty, Puzzle, PuzzleKey } from './sudokuTypes';
import {
  convert2DArrayToPuzzle,
  convertPuzzleTo2DArray,
  fillPartialPuzzle,
  solve,
  sortPuzzle,
  validatePuzzle,
} from './utility';

export type GameState =
  | {
      state: 'idle';
      difficulty: Difficulty;
    }
  | {
      state: 'loading';
      difficulty: Difficulty;
    }
  | {
      state: 'error';
      difficulty: Difficulty;
      error: Error;
    }
  | {
      state: 'ready';
      difficulty: Difficulty;
      puzzle: Puzzle;
      invalidKeys?: PuzzleKey[];
    }
  | {
      state: 'solved';
      difficulty: Difficulty;
      solution: Puzzle;
      message: string;
    }
  | {
      state: 'reset';
      difficulty: Difficulty;
    };

type Action =
  | { type: 'LOAD_GAME' }
  | { type: 'LOAD_GAME_SUCCESS'; payload: Partial<Puzzle> }
  | { type: 'LOAD_GAME_FAIL'; payload: Error }
  | { type: 'CHANGE_DIFFICULTY'; payload: Difficulty }
  | { type: 'COMPUTE_SOLUTION'; payload: Puzzle }
  | { type: 'RESET_GAME' }
  | { type: 'VALIDATE_PUZZLE'; payload: Puzzle };

type GameReducer = (state: GameState, action: Action) => GameState;

export const gameReducer: GameReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_GAME': {
      return { ...state, state: 'loading' };
    }
    case 'LOAD_GAME_FAIL': {
      return { ...state, state: 'error', error: action.payload };
    }
    case 'LOAD_GAME_SUCCESS': {
      return {
        state: 'ready',
        puzzle: sortPuzzle(fillPartialPuzzle(action.payload)),
        difficulty: state.difficulty,
      };
    }
    case 'CHANGE_DIFFICULTY': {
      return {
        ...state,
        difficulty: action.payload,
      };
    }
    case 'RESET_GAME': {
      return {
        state: 'reset',
        difficulty: state.difficulty,
      };
    }
    case 'VALIDATE_PUZZLE': {
      const puzzle = action.payload;
      const validity = validatePuzzle(puzzle);
      if (validity.state === 'invalid') {
        return {
          state: 'ready',
          puzzle,
          difficulty: state.difficulty,
          invalidKeys: validity.invalidKeys,
        };
      }

      return {
        state: 'solved',
        solution: puzzle,
        difficulty: state.difficulty,
        message: 'You did it!',
      };
    }
    case 'COMPUTE_SOLUTION': {
      const unsolvedPuzzle = action.payload;
      const solution = solve(convertPuzzleTo2DArray(unsolvedPuzzle));

      if (solution.state === 'unsolved') {
        return {
          state: 'solved',
          solution: unsolvedPuzzle,
          difficulty: state.difficulty,
          message: 'Sorry, this puzzle cannot be solved in this state.',
        };
      }

      const solvedPuzzle = convert2DArrayToPuzzle(solution.board);

      return {
        state: 'solved',
        solution: solvedPuzzle,
        difficulty: state.difficulty,

        message: 'Here is the solution. Try again!',
      };
    }
  }
};
