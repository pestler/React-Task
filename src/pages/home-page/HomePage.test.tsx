import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import HomePage from './HomePage';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/',
      search: '?page=2',
    }),
  };
});

vi.mock('../../components/Core/Core', () => ({
  default: ({ currentPage }: { currentPage: number }) => (
    <div>Mocked Core Component - Page {currentPage}</div>
  ),
}));

describe('HomePage Component', () => {
  it('renders HomePage correctly', () => {
    render(
      <MemoryRouter>
        <HomePage currentPage={1} />
      </MemoryRouter>
    );

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
    expect(
      screen.getByText('Mocked Core Component - Page 1')
    ).toBeInTheDocument();
  });

  it('updates currentPage based on URL search params', async () => {
    render(
      <MemoryRouter>
        <HomePage currentPage={1} />
      </MemoryRouter>
    );
  });
});
