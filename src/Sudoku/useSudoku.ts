import { useEffect, useReducer } from 'react';
import { convertPuzzleMapTo2DArray } from './convertPuzzleMapTo2DArray';
import type { Difficulty, Puzzle, PuzzleMap } from './puzzleTypes';

type GameState =
  | {
      state: 'initial';
    }
  | {
      state: 'loading';
    }
  | {
      state: 'playing';
      puzzle: Puzzle;
    }
  | {
      state: 'error';
      error: Error;
    };

type Action =
  | { type: 'LOADING_GAME' }
  | { type: 'LOADED_GAME'; puzzle: Puzzle }
  | { type: 'FAILED_TO_LOAD_GAME'; error: Error };

type GameReducer = (state: GameState, action: Action) => GameState;

type APIResponse = {
  difficulty: Difficulty;
  puzzle: PuzzleMap;
};

const initialState: GameState = {
  state: 'initial',
};

const gameReducer: GameReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_GAME': {
      return { state: 'loading' };
    }
    case 'FAILED_TO_LOAD_GAME': {
      return { state: 'error', error: action.error };
    }
    case 'LOADED_GAME': {
      return { state: 'playing', puzzle: action.puzzle };
    }
  }
};

type UseSudoku = ({ difficulty }: { difficulty: Difficulty }) => void;

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
          dispatchGameState({ type: 'FAILED_TO_LOAD_GAME', error });
        }

        const json = (await response.json()) as APIResponse;

        dispatchGameState({
          type: 'LOADED_GAME',
          puzzle: convertPuzzleMapTo2DArray(json.puzzle),
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
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };
    execute();

    return () => {
      abortController?.abort();
    };
  }, [difficulty]);

  return gameState;
};
