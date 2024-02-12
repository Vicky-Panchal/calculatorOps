import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders scientific calculator header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Scientific Calculator/i);
  expect(headerElement).toBeInTheDocument();
});

test('calculates square root correctly', () => {
  const { getByText, getByRole } = render(<App />);
  const inputElement = getByRole('spinbutton');
  fireEvent.change(inputElement, { target: { value: '25' } });
  fireEvent.click(getByText('Square Root (√x)'));
  const resultElement = getByText(/Result: /i);
  expect(resultElement.textContent).toBe('Result: 5');
});

test('calculates factorial correctly', () => {
  const { getByText, getByRole } = render(<App />);
  const inputElement = getByRole('spinbutton');
  fireEvent.change(inputElement, { target: { value: '5' } });
  fireEvent.click(getByText('Factorial (x!)'));
  const resultElement = getByText(/Result: /i);
  expect(resultElement.textContent).toBe('Result: 120');
});

test('calculates natural logarithm correctly', () => {
  const { getByText, getByRole } = render(<App />);
  const inputElement = getByRole('spinbutton');
  fireEvent.change(inputElement, { target: { value: '10' } });
  fireEvent.click(getByText('Natural Logarithm (ln(x))'));
  const resultElement = getByText(/Result: /i);
  expect(parseFloat(resultElement.textContent.split(' ')[1])).toBeCloseTo(2.302585092994046);
});

test('calculates power correctly', () => {
  const { getByText, getByRole } = render(<App />);
  const inputElement = getByRole('spinbutton');
  fireEvent.change(inputElement, { target: { value: '2' } });
  const mockPrompt = jest.spyOn(window, 'prompt').mockImplementation(() => '3');
  fireEvent.click(getByText('Power (x^b)'));
  const resultElement = getByText(/Result: /i);
  expect(resultElement.textContent).toBe('Result: 8');
  mockPrompt.mockRestore();
});
