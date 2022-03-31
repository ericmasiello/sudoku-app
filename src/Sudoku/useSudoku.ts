import { useEffect, useMemo, useReducer } from 'react';
import { convertPuzzleMapTo2DArray } from './convertPuzzleMapTo2DArray';
import type {
  Difficulty,
  OptionalPuzzle2DValue,
  Puzzle,
  Puzzle2DIndex,
  Puzzle2DValue,
  PuzzleMap,
} from './puzzleTypes';

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
      setSquare: (
        columnIndex: Puzzle2DIndex,
        rowIndex: Puzzle2DIndex,
        value: OptionalPuzzle2DValue
      ) => void;
    };

type Action =
  | { type: 'LOADING_GAME' }
  | { type: 'LOADED_GAME'; payload: Puzzle }
  | { type: 'FAILED_TO_LOAD_GAME'; payload: Error }
  | {
      type: 'SET_SQUARE';
      payload: {
        rowIndex: Puzzle2DIndex;
        columnIndex: Puzzle2DIndex;
        value: OptionalPuzzle2DValue;
      };
    };

type GameReducer = (state: AllGameState, action: Action) => AllGameState;

type APIResponse = {
  difficulty: Difficulty;
  puzzle: PuzzleMap;
};

const initialState: AllGameState = {
  state: 'initial',
};

const gameReducer: GameReducer = (state, action) => {
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
    case 'SET_SQUARE': {
      if (state.state !== 'ready') {
        throw new Error('Cannot set a square when the game has not yet begun.');
      }

      const { rowIndex, columnIndex, value } = action.payload;

      const nextPuzzleState = state.puzzle.map((row, currentRowIndex) => {
        return row.map((square, currentColumnIndex) => {
          if (
            rowIndex === currentRowIndex &&
            columnIndex === currentColumnIndex
          ) {
            return { ...square, value };
          }

          return square;
        });
      });

      return {
        ...state,
        puzzle: nextPuzzleState,
      };
    }
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

        const json = (await response.json()) as APIResponse;

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

  // TODO: is this useMemo necessary?
  const gameAPI: GameAPI = useMemo(() => {
    switch (gameState.state) {
      case 'ready': {
        return {
          state: 'playing',
          puzzle: gameState.puzzle,
          setSquare: (columnIndex, rowIndex, value) => {
            dispatchGameState({
              type: 'SET_SQUARE',
              payload: { rowIndex, columnIndex, value },
            });
          },
        };
      }
      default: {
        return gameState;
      }
    }
  }, [gameState]);

  return gameAPI;
};
