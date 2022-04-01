import classNames from 'classnames';
import { Difficulty } from './puzzleTypes';
import './DifficultySelect.css';

const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];

type DifficultySelectProps = Omit<
  React.HTMLProps<HTMLSelectElement>,
  'onChange'
> & {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
};

export const DifficultySelect = (props: DifficultySelectProps) => {
  const { value, onChange, className, ...rest } = props;

  return (
    <>
      <label className="visually-hidden" htmlFor="difficulty">
        Difficulty
      </label>
      <select
        {...rest}
        id="difficulty"
        value={value}
        onChange={(event) => onChange(event.target.value as Difficulty)}
        className={classNames('difficulty-select', className)}
      >
        {difficultyOptions.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>
    </>
  );
};
