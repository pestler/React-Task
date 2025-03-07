import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import ButtonSearch from './ButtonSearch';

describe('ButtonSearch component', () => {
  const onFormSubmit = vi.fn();

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders correctly with initial value', () => {
    const initialValue = 'test value';
    renderWithProviders(
      <ButtonSearch onFormSubmit={onFormSubmit} initValue={initialValue} />
    );

    const inputElement = screen.getByPlaceholderText(
      'Enter name'
    ) as HTMLInputElement;
    expect(inputElement).not.toBeNull();
    expect(inputElement.value).toBe(initialValue);
  });

  it('handles input change', () => {
    renderWithProviders(
      <ButtonSearch onFormSubmit={onFormSubmit} initValue="" />
    );

    const inputElement = screen.getByPlaceholderText(
      'Enter name'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(inputElement.value).toBe('new value');
  });

  it('calls onFormSubmit with the correct value when form is submitted', () => {
    renderWithProviders(
      <ButtonSearch onFormSubmit={onFormSubmit} initValue="" />
    );

    const inputElement = screen.getByPlaceholderText(
      'Enter name'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'submitted value' } });

    const submitButton = screen.getByText('Search');
    fireEvent.click(submitButton);

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit).toHaveBeenCalledWith(
      expect.anything(),
      'submitted value'
    );
  });

  it('applies theme styles', () => {
    renderWithProviders(
      <ButtonSearch onFormSubmit={onFormSubmit} initValue="" />
    );

    const headerElement = screen.getByText('Top controls');
    const computedStyle = window.getComputedStyle(headerElement);
    expect(computedStyle.backgroundColor).not.toBe('');
    expect(computedStyle.color).not.toBe('');
  });
});
