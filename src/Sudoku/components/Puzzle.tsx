import classNames from 'classnames';
import type { Puzzle as PuzzleType, PuzzleKey } from '../sudokuTypes';
import './Puzzle.css';
import { PuzzleSquare } from './PuzzleSquare';

type PuzzleProps = {
  puzzle: PuzzleType;
  className?: string;
  invalidKeys?: PuzzleKey[];
  disabled?: boolean;
};

export const Puzzle = (props: PuzzleProps) => {
  const { puzzle, invalidKeys, className, disabled } = props;

  // getOwnPropertyNames() returns an array of strings so I need to alias the type
  const puzzleKeys = Object.getOwnPropertyNames(puzzle) as PuzzleKey[];

  return (
    <div className={classNames('puzzle', className)}>
      {puzzleKeys.map((key) => (
        <PuzzleSquare
          key={key}
          id={key}
          value={puzzle[key]}
          isInvalid={invalidKeys?.includes(key)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
