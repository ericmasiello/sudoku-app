import { ErrorBoundary } from 'react-error-boundary';
// import { PuzzleBoard } from './Sudoku.old';
import { Game } from './Game';
import { useLogging } from './Logging';
import { ErrorFallback } from './ErrorBoundary';
import './App.css';

const App = () => {
  useLogging();

  return (
    <div className="app">
      <header className="app__header">
        <h1>Sudoku App</h1>
      </header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Game />
      </ErrorBoundary>
    </div>
  );
};

export default App;
