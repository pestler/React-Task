import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from './Error-boundary';

const ChildComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  it('renders the error message when a child component throws an error', () => {
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
