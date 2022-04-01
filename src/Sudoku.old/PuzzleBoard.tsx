import React, { useState } from 'react';
import classNames from 'classnames';
import type {
  Difficulty,
  PuzzleSquare as PuzzleSquareType,
} from './puzzleTypes';
import { useSudoku } from './useSudoku';
import './PuzzleBoard.css';
import { DifficultySelect } from './DifficultySelect';

type PuzzleSquareProps = {
  value: PuzzleSquareType;
  isInvalid?: boolean;
};

const PuzzleSquare = (props: PuzzleSquareProps) => {
  const { value: square, isInvalid } = props;

  return (
    <div>
      <label className="visually-hidden" htmlFor={square.id}>
        {square.id}
      </label>
      <input
        id={square.id}
        type="text"
        maxLength={1}
        inputMode="numeric"
        name={square.id}
        defaultValue={square.value === null ? '' : square.value}
        className={classNames('puzzle-square', {
          'puzzle-square--invalid': isInvalid,
        })}
      />
    </div>
  );
};

type PuzzleControlsProps = React.HTMLProps<HTMLDivElement>;

const PuzzleControls: React.FC<PuzzleControlsProps> = (props) => {
  const { className, ...rest } = props;
  return <div className={classNames('puzzle-controls', className)} {...rest} />;
};

type PuzzleBoardProps = {
  difficulty: Difficulty;
  loader: JSX.Element;
};

export const PuzzleBoard = (props: PuzzleBoardProps) => {
  const { difficulty: initialDifficulty, loader } = props;
  const game = useSudoku({ initialDifficulty });
  // TODO: make this return an array of items with errors, not just the first
  const [validState, setValidState] =
    useState<ReturnType<typeof handleValidateForm>>();

  if (game.state === 'loading') {
    return loader;
  }

  if (game.state === 'error') {
    throw game.error;
  }

  if (game.state !== 'playing') {
    return null;
  }

  const {
    puzzle,
    handleValidateForm,
    handleSolveForm,
    handleChangeDifficulty,
    difficulty,
  } = game;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setValidState(handleValidateForm(formData));
  };

  const handleSolve: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget.form;

    if (!form) {
      return;
    }

    const formData = new FormData(form);

    handleSolveForm(formData);
  };

  return (
    <form title="Puzzle Board" onSubmit={handleSubmit}>
      <div className="puzzle-board">
        {puzzle.flatMap((column) => {
          return column.map((square) => {
            return (
              <PuzzleSquare
                isInvalid={
                  validState?.result === 'invalid' &&
                  validState.key === square.id
                }
                value={square}
                key={square.id}
              />
            );
          });
        })}
      </div>
      <PuzzleControls>
        <DifficultySelect
          value={difficulty}
          onChange={handleChangeDifficulty}
        />
        <button className="button" type="submit">
          Validate
        </button>
        <button className="button" type="button" onClick={handleSolve}>
          Solve
        </button>
      </PuzzleControls>

      {validState?.result === 'valid' && <p>You Win!</p>}
      {validState?.result === 'invalid' && <p>Invalid. Please try again.</p>}
    </form>
  );
};

/*
 TODO:
  - Convert data to just be a map with keys like the shape of the data from the API
*/
