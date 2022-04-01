import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('logrocket');

test('renders learn react link', () => {
  render(<App />);
  const title = screen.getByText(/sudoku/i);
  expect(title).toBeInTheDocument();
});
