import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders submit button', () => {
  render(<App />);
  const submitElement = screen.getByText(/Submit/i);
  expect(submitElement).toBeInTheDocument();
});

test('renders email field', () => {
  render(<App />);
  const fieldElement = screen.getByText(/Enter your email/i);
  expect(fieldElement).toBeInTheDocument();
});
