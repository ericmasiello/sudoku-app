import type { Difficulty, Puzzle, PuzzleKey } from './sudokuTypes';
import { fillPartialPuzzle, sortPuzzle, validatePuzzle } from './utility';

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
      message?: string;
    }
  | {
      state: 'busy';
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
  | { type: 'GAVE_UP'; payload: Puzzle }
  | { type: 'INVALID_PUZZLE'; payload: Puzzle }
  | { type: 'RESET_GAME' }
  | { type: 'VALIDATE_PUZZLE'; payload: Puzzle }
  | { type: 'SOLVING' }
  | { type: 'SOLVE_FAIL'; payload: Error };

type GameReducer = (state: GameState, action: Action) => GameState;

export const gameReducer: GameReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_GAME': {
      return { ...state, state: 'loading' };
    }
    case 'LOAD_GAME_FAIL':
    case 'SOLVE_FAIL': {
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
    case 'GAVE_UP': {
      return {
        state: 'solved',
        solution: action.payload,
        difficulty: state.difficulty,
        message: 'Here is the solution. Try again!',
      };
    }
    case 'INVALID_PUZZLE': {
      return {
        state: 'ready',
        puzzle: action.payload,
        difficulty: state.difficulty,
        message:
          'Sorry, this puzzle cannot be solved in this state. Please try again.',
      };
    }
    case 'SOLVING': {
      if (state.state !== 'ready') {
        throw new Error('Transitioning from an invalid state');
      }
      return {
        ...state,
        state: 'busy',
      };
    }
  }
};
