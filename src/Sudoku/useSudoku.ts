import { useEffect, useReducer } from 'react';
import {
  COLUMN_OFFSET,
  convertPuzzleMapTo2DArray,
} from './convertPuzzleMapTo2DArray';
import { ValidationError } from './Errors';
import type { Difficulty, Puzzle } from './puzzleTypes';
import { STUB } from './stub';
import { isValidSudoku } from './validateSudoku';

type NonReadyStates =
  | {
      state: 'initial';
    }
  | {
      state: 'loading';
    }
  | {
      state: 'error';
      error: Error;
    };

type AllGameState =
  | NonReadyStates
  | {
      state: 'ready';
      puzzle: Puzzle;
    };

type GameAPI =
  | NonReadyStates
  | {
      state: 'playing';
      puzzle: Puzzle;
      handleValidateForm: typeof handleValidateForm;
    };

type Action =
  | { type: 'LOADING_GAME' }
  | { type: 'LOADED_GAME'; payload: Puzzle }
  | { type: 'FAILED_TO_LOAD_GAME'; payload: Error };

type GameReducer = (state: AllGameState, action: Action) => AllGameState;

const initialState: AllGameState = {
  state: 'initial',
};

const gameReducer: GameReducer = (_, action) => {
  switch (action.type) {
    case 'LOADING_GAME': {
      return { state: 'loading' };
    }
    case 'FAILED_TO_LOAD_GAME': {
      return { state: 'error', error: action.payload };
    }
    case 'LOADED_GAME': {
      return { state: 'ready', puzzle: action.payload };
    }
  }
};

type HandleValidateForm = (
  formData: FormData
) => { result: 'valid' } | { result: 'invalid'; reason: string; key?: string };

const handleValidateForm: HandleValidateForm = (formData: FormData) => {
  const initialValue: number[][] = [];
  const formObject = Object.fromEntries(formData);
  console.log(formObject);
  try {
    const result = Object.entries(formObject).reduce(
      (acc, [key, valueAsString]) => {
        const [row, column] = key.split('').map((char) => {
          if (!parseInt(char)) {
            // handle converting 'A' to 0...
            return char.charCodeAt(0) - COLUMN_OFFSET;
          }
          // handle converting '1' to 0...
          return parseInt(char) - 1;
        });

        const value = parseInt(valueAsString.toString());

        if (isNaN(value) || value < 1 || value > 9) {
          throw new ValidationError(`Invalid value: "${valueAsString}"`, key);
        }

        if (!acc[row]) {
          acc[row] = [];
        }

        acc[row][column] = value;

        return acc;
      },
      initialValue
    );
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

type UseSudoku = ({ difficulty }: { difficulty: Difficulty }) => GameAPI;

export const useSudoku: UseSudoku = (options) => {
  const { difficulty } = options;
  const [gameState, dispatchGameState] = useReducer(gameReducer, initialState);

  useEffect(() => {
    dispatchGameState({ type: 'LOADING_GAME' });

    const abortController =
      typeof AbortController !== 'undefined'
        ? new AbortController()
        : undefined;

    const execute = async () => {
      try {
        const response = await fetch(
          `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficulty}`,
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
  }, [difficulty]);

  switch (gameState.state) {
    case 'ready': {
      return {
        state: 'playing',
        puzzle: gameState.puzzle,
        handleValidateForm,
      };
    }
    default: {
      return gameState;
    }
  }
};
