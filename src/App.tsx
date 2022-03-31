import React, { useState } from 'react';
import './App.css';
import { useSudoku } from './Sudoku';
import type { Difficulty } from './Sudoku';

const GameBoard = () => {
  return <div>The board</div>;
};

const App = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const gameState = useSudoku({ difficulty });
  console.log(gameState);
  return (
    <div className="App">
      <header className="App-header">Sudoku App</header>
      <GameBoard />
    </div>
  );
};

export default App;
