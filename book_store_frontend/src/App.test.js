import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Checkout link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Checkout/i);
  expect(linkElement).toBeInTheDocument();
});
