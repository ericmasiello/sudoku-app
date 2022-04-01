import { useSudoku, Puzzle, Difficulty } from './Sudoku';
import { Loading } from './common/Components/Loading';
import { Button } from './common/Components/Button';
import { Dropdown } from './common/Components/Dropdown';
import { convertFormToPuzzle } from './Sudoku';
import { useThrowToErrorBoundary } from './common/hooks/useThrowToErrorBoundary';
import './Game.css';

const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];

export const Game = () => {
  const gameAPI = useSudoku();
  const throwToErrorBoundary = useThrowToErrorBoundary();

  if (gameAPI.state === 'error') {
    throw gameAPI.error;
  }

  if (gameAPI.state === 'loading' || gameAPI.state === 'idle') {
    return (
      <div className="game">
        <Loading />
      </div>
    );
  }

  if (gameAPI.state === 'gameOver') {
    return (
      <div className="game">
        <Puzzle puzzle={gameAPI.solution} disabled className="game__puzzle" />
        <Button
          type="button"
          onClick={() => {
            gameAPI.handleResetGame();
          }}
        >
          New Game
        </Button>
        <p className="game__status" role="alert" aria-live="polite">
          {gameAPI.message}
        </p>
      </div>
    );
  }

  const onSolve: React.FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget.form;

    if (!form) {
      return;
    }

    let puzzle: ReturnType<typeof convertFormToPuzzle>;

    try {
      puzzle = convertFormToPuzzle(form);
    } catch {
      return throwToErrorBoundary(
        new Error('Could not convert form data to a valid puzzle')
      );
    }

    gameAPI.handleSolve(puzzle);
  };

  const onValidate: React.FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget.form;

    if (!form) {
      return;
    }

    let puzzle: ReturnType<typeof convertFormToPuzzle>;

    try {
      puzzle = convertFormToPuzzle(form);
    } catch {
      return throwToErrorBoundary(
        new Error('Could not convert form data to a valid puzzle')
      );
    }

    gameAPI.handleValidate(puzzle);
  };

  return (
    <form
      className="game"
      title="Sudoku Game"
      onSubmit={(event) => event.preventDefault()}
    >
      <Puzzle
        puzzle={gameAPI.puzzle}
        invalidKeys={gameAPI.invalidKeys}
        className="game__puzzle"
      />
      <div className="game__controls">
        <Dropdown
          value={gameAPI.difficulty}
          onChange={(event) => {
            gameAPI.handleChangeDifficulty(event.target.value as Difficulty);
          }}
        >
          {difficultyOptions.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </Dropdown>
        <Button type="submit" onClick={onSolve}>
          I give up
        </Button>
        <Button onClick={onValidate}>Validate</Button>
      </div>
    </form>
  );
};
