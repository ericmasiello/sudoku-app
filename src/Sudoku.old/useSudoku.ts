import produce from 'immer';
import { useEffect, useReducer } from 'react';
import {
  COLUMN_OFFSET,
  convertPuzzleMapTo2DArray,
} from './convertPuzzleMapTo2DArray';
import { ValidationError } from './Errors';
import type { Difficulty, Puzzle } from './puzzleTypes';
import { solve } from './solve';
import { STUB } from './stub';
import { isValidSudoku } from './validateSudoku';

type NonReadyStates =
  | {
      state: 'initial';
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
      state: 'end';
      difficulty: Difficulty;
      puzzle: Puzzle;
    };

type AllGameState =
  | NonReadyStates
  | {
      state: 'ready';
      difficulty: Difficulty;
      puzzle: Puzzle;
    };

type GameAPI =
  | NonReadyStates
  | {
      state: 'playing';
      difficulty: Difficulty;
      puzzle: Puzzle;
      handleChangeDifficulty: (difficulty: Difficulty) => void;
      handleValidateForm: HandleValidateForm;
      handleSolveForm: HandleSolveForm;
    };

type Action =
  | { type: 'LOADING_GAME' }
  | { type: 'LOADED_GAME'; payload: Puzzle }
  | { type: 'FAILED_TO_LOAD_GAME'; payload: Error }
  | { type: 'CHANGE_DIFFICULTY'; payload: Difficulty }
  | { type: 'SOLVE_PUZZLE'; payload: Puzzle };

type GameReducer = (state: AllGameState, action: Action) => AllGameState;

const initialState: AllGameState = {
  state: 'initial',
  difficulty: 'easy',
};

const gameReducer: GameReducer = (currentState, action) => {
  switch (action.type) {
    case 'LOADING_GAME': {
      return { ...currentState, state: 'loading' };
    }
    case 'FAILED_TO_LOAD_GAME': {
      return { ...currentState, state: 'error', error: action.payload };
    }
    case 'LOADED_GAME': {
      return { ...currentState, state: 'ready', puzzle: action.payload };
    }
    case 'CHANGE_DIFFICULTY': {
      return { ...currentState, difficulty: action.payload };
    }
    case 'SOLVE_PUZZLE': {
      return { ...currentState, state: 'end', puzzle: action.payload };
    }
  }
};

const convertFormDataTo2DArray = (
  formData: FormData,
  handleInvalidValue?: (key: string, value: string) => void
): number[][] => {
  const initialValue: number[][] = [];
  const formObject = Object.fromEntries(formData);
  return Object.entries(formObject).reduce((acc, [key, valueAsString]) => {
    const [row, column] = key.split('').map((char) => {
      if (!parseInt(char)) {
        // handle converting 'A' to 0...
        return char.charCodeAt(0) - COLUMN_OFFSET;
      }
      // handle converting '1' to 0...
      return parseInt(char) - 1;
    });

    let value = parseInt(valueAsString.toString());

    if (isNaN(value) || value < 1 || value > 9) {
      handleInvalidValue?.(key, valueAsString.toString());

      value = 0;
    }

    if (!acc[row]) {
      acc[row] = [];
    }

    acc[row][column] = value;

    return acc;
  }, initialValue);
};

type HandleSolveForm = (formData: FormData) => void;

type HandleValidateForm = (
  formData: FormData
) => { result: 'valid' } | { result: 'invalid'; reason: string; key?: string };

const handleValidateForm: HandleValidateForm = (formData) => {
  try {
    const result = convertFormDataTo2DArray(formData, (key, value) => {
      throw new ValidationError(`Invalid value: "${value}"`, key);
    });

    if (isValidSudoku(result)) {
      return { result: 'valid' };
    } else {
      return { result: 'invalid', reason: 'Invalid Sudoku' };
    }
  } catch (error) {
    return {
      result: 'invalid',
      reason: error instanceof Error ? error.message : 'Unknown error',
      key: error instanceof ValidationError ? error.key : undefined,
    };
  }
};

type UseSudoku = (options: { initialDifficulty: Difficulty }) => GameAPI;

export const useSudoku: UseSudoku = (options) => {
  const { initialDifficulty } = options;
  const [gameState, dispatchGameState] = useReducer(gameReducer, {
    ...initialState,
    difficulty: initialDifficulty,
  });

  useEffect(() => {
    dispatchGameState({ type: 'LOADING_GAME' });

    const abortController =
      typeof AbortController !== 'undefined'
        ? new AbortController()
        : undefined;

    const execute = async () => {
      try {
        const response = await fetch(
          `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${gameState.difficulty}`,
          { signal: abortController?.signal }
        );

        if (!response.ok) {
          // TODO: convert this into a custom error
          const error = new Error(
            `Failed to load game. Failed with response: ${response.statusText})`
          );
          dispatchGameState({ type: 'FAILED_TO_LOAD_GAME', payload: error });
        }

        // const json = (await response.json()) as APIResponse;
        const json = STUB;

        dispatchGameState({
          type: 'LOADED_GAME',
          payload: convertPuzzleMapTo2DArray(json.puzzle),
        });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          /*
           * AbortErrors are expected and should not throw to the game state
           */
          return;
        }

        dispatchGameState({
          type: 'FAILED_TO_LOAD_GAME',
          payload: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };
    execute();

    return () => {
      abortController?.abort();
    };
  }, [gameState.difficulty]);

  const handleSolveForm: HandleSolveForm = (formData) => {
    const input = convertFormDataTo2DArray(formData);
    const result = produce(input, (draftInput) => {
      // FIXME: `solve()` treats the 2D array differently - its [rows][columns], not [columns][rows]
      solve(draftInput);
    });

    console.log('solved board?', input, result);

    throw new Error('FIXME: need to convert result back into a Puzzle');
    // dispatchGameState({ type: 'SOLVE_PUZZLE', payload: result as unknown as Puzzle });
  };

  switch (gameState.state) {
    case 'ready': {
      return {
        state: 'playing',
        difficulty: gameState.difficulty,
        puzzle: gameState.puzzle,
        handleValidateForm,
        handleSolveForm,
        handleChangeDifficulty: (difficulty) => {
          dispatchGameState({ type: 'CHANGE_DIFFICULTY', payload: difficulty });
        },
      };
    }
    default: {
      return gameState;
    }
  }
};
