import React, { useState } from 'react';
import classNames from 'classnames';
import type {
  Difficulty,
  PuzzleSquare as PuzzleSquareType,
} from './puzzleTypes';
import { useSudoku } from './useSudoku';
import './PuzzleBoard.css';

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
        name={square.id}
        defaultValue={square.value === null ? '' : square.value}
        className={classNames('puzzle-square', {
          'puzzle-square--invalid': isInvalid,
        })}
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
  const [validState, setValidState] =
    useState<ReturnType<typeof handleValidateForm>>();

  if (game.state === 'error') {
    throw game.error;
  }

  if (game.state !== 'playing') {
    return null;
  }

  const { puzzle, handleValidateForm, handleSolveForm } = game;

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
      <button type="submit">Validate</button>
      <button type="button" onClick={handleSolve}>
        Solve
      </button>
      {validState?.result === 'valid' && <p>You Win!</p>}
      {validState?.result === 'invalid' && <p>Invalid. Please try again.</p>}
    </form>
  );
};

/*
 TODO:
  - Convert data to just be a map with keys like the shape of the data from the API
*/
