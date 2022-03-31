import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PuzzleBoard } from './Sudoku';
import type { Difficulty } from './Sudoku';
import { useLogging } from './Logging';
import { ErrorFallback } from './ErrorBoundary';
import './App.css';

const App = () => {
  useLogging();
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  return (
    <div className="App">
      <header className="App-header">Sudoku App</header>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PuzzleBoard difficulty={difficulty} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
