import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Search from './Button-search';

describe('Search Component', () => {
  const mockOnFormSubmit = vi.fn();

  it('renders the search form with initial value', () => {
    render(<Search onFormSubmit={mockOnFormSubmit} value="initial" />);

    const inputElement = screen.getByPlaceholderText('Enter name');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('initial');
  });

  it('updates the input value on change', () => {
    render(<Search onFormSubmit={mockOnFormSubmit} value="initial" />);

    const inputElement = screen.getByPlaceholderText('Enter name');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(inputElement).toHaveValue('new value');
  });

  it('calls onFormSubmit with the correct value when form is submitted', () => {
    render(<Search onFormSubmit={mockOnFormSubmit} value="initial" />);

    const inputElement = screen.getByPlaceholderText('Enter name');
    const formElement = inputElement.closest('form');

    if (formElement) {
      fireEvent.change(inputElement, { target: { value: 'submitted value' } });
      fireEvent.submit(formElement);

      expect(mockOnFormSubmit).toHaveBeenCalledWith(
        expect.any(Object),
        'submitted value'
      );
    } else {
      throw new Error('Form element not found');
    }
  });
});
