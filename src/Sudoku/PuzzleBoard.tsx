import React from 'react';
import type { Difficulty, OptionalPuzzle2DValue } from './puzzleTypes';
import { useSudoku } from './useSudoku';
import './PuzzleBoard.css';

type PuzzleSquareProps = {
  value: OptionalPuzzle2DValue;
};

const PuzzleSquare = (props: PuzzleSquareProps) => {
  const value = props.value === null ? '' : props.value;

  return (
    <div>
      <input type="text" defaultValue={value} />
    </div>
  );
};

type PuzzleBoardProps = {
  difficulty: Difficulty;
};

export const PuzzleBoard = (props: PuzzleBoardProps) => {
  const { difficulty } = props;
  const gameState = useSudoku({ difficulty });

  if (gameState.state === 'error') {
    throw gameState.error;
  }

  if (gameState.state !== 'playing') {
    return null;
  }

  const { puzzle } = gameState;

  return (
    <div className="puzzle-board">
      {puzzle.map((column, columIndex) => {
        return column.map((square, rowIndex) => {
          return <PuzzleSquare value={square.value} key={square.id} />;
        });
      })}
    </div>
  );
};
