import classNames from 'classnames';
import { useEffect, useState } from 'react';
import type { PuzzleKey, PuzzleValue } from '../sudokuTypes';
import './PuzzleSquare.css';

type PuzzleSquareProps = {
  id: PuzzleKey;
  value: PuzzleValue;
  isInvalid?: boolean;
  disabled?: boolean;
};

export const PuzzleSquare = (props: PuzzleSquareProps) => {
  const { id, value, isInvalid, disabled } = props;
  const [isTouched, setIsTouched] = useState(false);
  const hasError = !isTouched && isInvalid;
  const errorId = `${id}-error`;

  useEffect(() => {
    setIsTouched(false);
  }, [isInvalid]);

  return (
    <div>
      <label
        className="visually-hidden"
        htmlFor={id}
        aria-describedby={hasError ? errorId : undefined}
      >
        {id}
      </label>
      {hasError && (
        <span id={errorId} className="visually-hidden" data-testid={errorId}>
          Value is invalid
        </span>
      )}
      <input
        id={id}
        type="text"
        maxLength={1}
        inputMode="numeric"
        disabled={disabled}
        name={id}
        defaultValue={value === null ? '' : value}
        className={classNames('puzzle-square', {
          'puzzle-square--invalid': hasError,
        })}
        onChange={(event) => {
          setIsTouched(true);
        }}
        autoComplete="off"
      />
    </div>
  );
};
