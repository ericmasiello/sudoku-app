import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { Game } from '../Game';
import { server } from '../setupTests';
import { ErrorBoundary } from 'react-error-boundary';
import userEvent from '@testing-library/user-event';

// silence console.error
jest.spyOn(console, 'error').mockImplementation(() => {});

it('should render an error when the client fails to load data', async () => {
  server.use(
    rest.get(
      'https://vast-chamber-17969.herokuapp.com/generate*',
      (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Error' }));
      }
    )
  );

  render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Game />
    </ErrorBoundary>
  );

  // wait for loading spinner
  expect(await screen.findByRole('status')).toBeDefined();

  // wait for error message
  expect(await screen.findByText(/Something went wrong/i)).toBeDefined();
});

it('should render the game', async () => {
  render(<Game />);

  // wait for loading spinner
  expect(await screen.findByRole('status')).toBeDefined();

  // wait for the game form
  expect(await screen.findByRole('form')).toBeDefined();
});

it('should reload the game when changing difficulty options', async () => {
  render(<Game />);

  // wait for the game form
  expect(await screen.findByRole('form')).toBeDefined();

  // change the difficulty to medium
  fireEvent.change(screen.getByLabelText(/difficulty/i), {
    target: { value: 'medium' },
  });

  // wait for loading spinner
  expect(await screen.findByRole('status')).toBeDefined();

  // wait for the game form to reappear
  expect(await screen.findByRole('form')).toBeDefined();
});

it('should validate the game', async () => {
  render(<Game />);

  // wait for the game form
  expect(await screen.findByRole('form')).toBeDefined();

  // validate the board with invalid values (including position A1)
  userEvent.click(screen.getByText(/validate/i));

  // verify A1-error appears
  expect(screen.getByTestId('A1-error')).toBeDefined();

  // type something into A1
  userEvent.type(screen.getByLabelText(/A1/i), '1');

  // now the error should be gone
  expect(screen.queryByTestId('A1-error')).toBeNull();
});

it('should solve the game when you give up', async () => {
  render(<Game />);

  // wait for the game form
  expect(await screen.findByRole('form')).toBeDefined();

  // click the give up button to see the solution
  userEvent.click(screen.getByText(/i give up/i));

  // very the alert message appears
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Here is the solution. Try again!"`
  );

  // click new game
  userEvent.click(screen.getByText(/new game/i));

  // wait for loading spinner
  expect(await screen.findByRole('status')).toBeDefined();

  // wait for the game form to reappear
  expect(await screen.findByRole('form')).toBeDefined();
});
