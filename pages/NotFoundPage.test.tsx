import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router';
import NotFoundPage from './NotFoundPage';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NotFoundPage Component', () => {
  it('renders NotFoundPage correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('calls navigate with -1 when the button is clicked', () => {
    const mockNavigate = vi.fn();
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Назад'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
