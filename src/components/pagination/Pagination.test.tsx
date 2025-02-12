import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router';
import Pagination from './Pagination';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn().mockReturnValue({
      pathname: '/',
      search: '?page=1',
    }),
  };
});

describe('Pagination Component', () => {
  const mockOnPageChange = vi.fn();

  it('renders pagination buttons correctly', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  it('disables the button of the current page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });

  it('calls onPageChange and navigate on button click', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });
});
