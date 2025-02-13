import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import HomePage from './HomePage';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn().mockReturnValue({
      pathname: '/',
      search: '?page=1',
    }),
    Outlet: () => <div>Mocked Outlet</div>,
  };
});

vi.mock('../../components/Core', () => ({
  default: ({
    currentPage,
    onPageChange,
  }: {
    currentPage: number;
    onPageChange: (page: number) => void;
  }) => (
    <div>
      Mocked Core Component
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
    </div>
  ),
}));

describe('HomePage Component', () => {
  const mockOnPageChange = vi.fn();

  it('renders HomePage correctly', () => {
    render(
      <MemoryRouter>
        <HomePage currentPage={1} onPageChange={mockOnPageChange} />
      </MemoryRouter>
    );

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
    expect(screen.getByText('Mocked Core Component')).toBeInTheDocument();
    expect(screen.getByText('Mocked Outlet')).toBeInTheDocument();
  });

  it('calls onPageChange with the correct page on initial load', () => {
    render(
      <MemoryRouter>
        <HomePage currentPage={1} onPageChange={mockOnPageChange} />
      </MemoryRouter>
    );

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
