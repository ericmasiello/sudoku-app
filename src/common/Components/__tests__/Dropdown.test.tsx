import { screen, render } from '@testing-library/react';
import { Dropdown } from '../Dropdown';

it('should a <select />', () => {
  render(<Dropdown />);

  expect(screen.getByRole('combobox')).toBeDefined();
});

it('should apply a custom className', () => {
  render(<Dropdown className="test" data-testid="wrapper" />);

  expect(screen.getByTestId('wrapper')).toHaveClass('test');
});

it('should apply arbitrary props', () => {
  render(<Dropdown data-foo="bar" />);

  expect(screen.getByRole('combobox').dataset['foo']).toBe('bar');
});

it('should set the styles and element to disabled', () => {
  render(<Dropdown disabled data-testid="wrapper" />);

  // wrapper should have a class that makes it appear disabled
  expect(screen.getByTestId('wrapper')).toHaveClass('dropdown--disabled');
  // and the actual <select /> is disabled
  expect(screen.getByRole('combobox')).toBeDisabled();
});
