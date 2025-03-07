/* import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { ThemeProvider } from '../../components/theme-context/ThemeProvider';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({
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
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HomePage currentPage={1} />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
    expect(
      screen.getByText('Mocked Core Component - Page 1')
    ).toBeInTheDocument();
  });
});
 */
