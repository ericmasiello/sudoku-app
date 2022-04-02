import { screen, render } from '@testing-library/react';
import { Button } from '../Button';

it('should render <button />', () => {
  render(<Button />);

  expect(screen.getByRole('button')).toBeDefined();
});

it('should apply a custom className on the wrapper element', () => {
  render(<Button className="test" />);

  expect(screen.getByRole('button')).toHaveClass('test');
});

it('should apply arbitrary props', () => {
  render(<Button data-foo="bar" />);

  expect(screen.getByRole('button').dataset['foo']).toBe('bar');
});

it('should render custom children', () => {
  render(<Button>Hello world</Button>);

  expect(screen.getByRole('button')).toHaveTextContent('Hello world');
});
