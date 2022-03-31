import React from 'react';
import type {
  Difficulty,
  Puzzle2DIndex,
  Puzzle2DValue,
  PuzzleSquare as PuzzleSquareType,
} from './puzzleTypes';
import { useSudoku } from './useSudoku';
import './PuzzleBoard.css';

type PuzzleSquareProps = {
  value: PuzzleSquareType;
  setValue: (value: string) => void;
};

const PuzzleSquare = (props: PuzzleSquareProps) => {
  const { value: square, setValue } = props;
  const value = square.value === null ? '' : square.value;

  return (
    <div>
      <label className="visually-hidden" htmlFor={square.id}>
        {square.id}
      </label>
      <input
        id={square.id}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="puzzle-square"
      />
    </div>
  );
};

type PuzzleBoardProps = {
  difficulty: Difficulty;
};

export const PuzzleBoard = (props: PuzzleBoardProps) => {
  const { difficulty } = props;
  const game = useSudoku({ difficulty });

  if (game.state === 'error') {
    throw game.error;
  }

  if (game.state !== 'playing') {
    return null;
  }

  const { puzzle, setSquare } = game;

  return (
    <section className="puzzle-board" title="Puzzle Board">
      {puzzle.map((column, columnIndex) => {
        return column.map((square, rowIndex) => {
          return (
            <PuzzleSquare
              value={square}
              setValue={(nextValue) => {
                const cIndex = columnIndex as Puzzle2DIndex;
                const rIndex = rowIndex as Puzzle2DIndex;

                if (nextValue === '') {
                  setSquare(cIndex, rIndex, null);
                }

                setSquare(cIndex, rIndex, Number(nextValue) as Puzzle2DValue);
              }}
              key={square.id}
            />
          );
        });
      })}
    </section>
  );
};
