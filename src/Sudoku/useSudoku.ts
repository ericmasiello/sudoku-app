import { useEffect, useReducer } from 'react';
import * as Comlink from 'comlink';
import { gameReducer } from './gameReducer';
import type { Difficulty, Puzzle, PuzzleKey } from './sudokuTypes';
import { fetchPuzzle } from './client/sudokuClient';
import type { Board, SolutionResult } from './utility/solvePuzzle';
// @ts-ignore - 'worker-loader' isn't typed
// eslint-disable-next-line import/no-webpack-loader-syntax
import SolvePuzzleWorker from 'worker-loader!./utility/solvePuzzle.worker';
import { convert2DArrayToPuzzle, convertPuzzleTo2DArray } from './utility';

const solvePuzzleWorker = Comlink.wrap<{
  solve: (puzzle: Board) => SolutionResult;
}>(new SolvePuzzleWorker());

type GameAPI =
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
      state: 'playing' | 'busy';
      difficulty: Difficulty;
      puzzle: Puzzle;
      invalidKeys: PuzzleKey[];
      handleChangeDifficulty: (difficulty: Difficulty) => void;
      handleValidate: (puzzle: Puzzle) => void;
      handleSolve: (puzzle: Puzzle) => void;
      message?: string;
    }
  | {
      state: 'gameOver';
      difficulty: Difficulty;
      solution: Puzzle;
      handleResetGame: () => void;
      message: string;
    };

type UseSudoku = (options?: { initialDifficulty?: Difficulty }) => GameAPI;

export const useSudoku: UseSudoku = (options) => {
  const { initialDifficulty } = options ?? {};
  const [gameState, dispatch] = useReducer(gameReducer, {
    state: 'idle',
    difficulty: initialDifficulty ?? 'easy',
  });

  const gameReset = gameState.state === 'reset' ? true : false;

  useEffect(() => {
    dispatch({ type: 'LOAD_GAME' });
    const abortController =
      typeof AbortController !== 'undefined'
        ? new AbortController()
        : undefined;

    const execute = async () => {
      const abortSignal = abortController?.signal;

      try {
        const puzzle = await fetchPuzzle({
          difficulty: gameState.difficulty,
          abortSignal,
        });

        dispatch({ type: 'LOAD_GAME_SUCCESS', payload: puzzle });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // AbortErrors are expected and should not throw to the game state
          return;
        }

        dispatch({
          type: 'LOAD_GAME_FAIL',
          payload: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    execute();

    return () => {
      abortController?.abort();
    };
  }, [gameState.difficulty, gameReset]);

  /*
   * The 'ready' gameState maps to 'playing'. However
   * we have to patch in additional methods for the playing state
   */
  if (gameState.state === 'ready' || gameState.state === 'busy') {
    return {
      state: gameState.state === 'ready' ? 'playing' : 'busy',
      puzzle: gameState.puzzle,
      message: gameState.state === 'ready' ? gameState.message : undefined,
      difficulty: gameState.difficulty,
      invalidKeys: gameState.invalidKeys ?? [],
      handleChangeDifficulty: (difficulty) => {
        dispatch({ type: 'CHANGE_DIFFICULTY', payload: difficulty });
      },
      handleSolve: (unsolvedPuzzle: Puzzle) => {
        dispatch({ type: 'SOLVING' });
        solvePuzzleWorker
          .solve(convertPuzzleTo2DArray(unsolvedPuzzle))
          .then((result) => {
            if (result.state === 'unsolved') {
              dispatch({ type: 'INVALID_PUZZLE', payload: unsolvedPuzzle });
              return;
            }

            const solvedPuzzle = convert2DArrayToPuzzle(result.board);

            dispatch({ type: 'GAVE_UP', payload: solvedPuzzle });
          });
      },
      handleValidate: (puzzle: Puzzle) => {
        dispatch({ type: 'VALIDATE_PUZZLE', payload: puzzle });
      },
    };
  } else if (gameState.state === 'solved') {
    /*
     * The 'solved' gameState maps to 'gameOver'.
     */
    return {
      state: 'gameOver',
      difficulty: gameState.difficulty,
      solution: gameState.solution,
      handleResetGame: () => {
        dispatch({ type: 'RESET_GAME' });
      },
      message: gameState.message,
    };
  } else if (gameState.state === 'reset') {
    return {
      state: 'idle',
      difficulty: gameState.difficulty,
    };
  }

  return gameState;
};
