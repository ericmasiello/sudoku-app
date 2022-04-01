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

  useEffect(() => {
    setIsTouched(false);
  }, [isInvalid]);

  return (
    <div>
      <label className="visually-hidden" htmlFor={id}>
        {id}
      </label>
      <input
        id={id}
        type="text"
        maxLength={1}
        inputMode="numeric"
        disabled={disabled}
        name={id}
        defaultValue={value === null ? '' : value}
        className={classNames('puzzle-square', {
          'puzzle-square--invalid': !isTouched && isInvalid,
        })}
        onChange={(event) => {
          setIsTouched(true);
        }}
        autoComplete="off"
      />
    </div>
  );
};
