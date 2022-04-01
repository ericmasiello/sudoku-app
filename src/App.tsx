import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PuzzleBoard } from './Sudoku.old';
import { useLogging } from './Logging';
import { ErrorFallback } from './ErrorBoundary';
import './App.css';

const App = () => {
  useLogging();

  return (
    <div>
      <header className="header">
        <h1>Sudoku App</h1>
      </header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PuzzleBoard difficulty="easy" loader={<div>Loading...</div>} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
