import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router';
import CardDetails from './CardDetails';
import { Person } from '../../types/types';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import { renderWithStateMgmtAndRouter } from '../../test-util';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../theme-context/useTheme', () => ({
  useTheme: vi.fn().mockReturnValue({
    theme: {
      backgroundColor: 'rgb(255, 255, 255)',
      color: 'rgb(0, 0, 0)',
    },
  }),
}));

const mockPerson: Person = {
  name: 'Luke Skywalker',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
  height: '172',
  mass: '77',
  hair_color: 'blond',
};

describe('CardDetails Component', () => {
  it('renders correctly with given person data', () => {
    renderWithStateMgmtAndRouter(
      <ThemeProvider>
        <CardDetails person={mockPerson} currentPage={1} />
      </ThemeProvider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
  });

  it('applies theme styles correctly', () => {
    renderWithStateMgmtAndRouter(
      <ThemeProvider>
        <CardDetails person={mockPerson} currentPage={1} />
      </ThemeProvider>
    );

    const cardDetails = screen.getByText('Luke Skywalker').parentElement;
    expect(cardDetails).toHaveStyle('background-color: rgb(255, 255, 255)');
    expect(cardDetails).toHaveStyle('color: rgb(0, 0, 0)');
  });

  it('navigates correctly when close button is clicked on details page', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderWithStateMgmtAndRouter(
      <ThemeProvider>
        <CardDetails person={mockPerson} currentPage={1} />
      </ThemeProvider>,
      { route: '/details/Luke Skywalker' }
    );

    const closeButton = screen.getByText('CLOSE');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/details/${mockPerson.name}?page=1`
    );
  });

  it('navigates to details page when not on details page and close button is clicked', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderWithStateMgmtAndRouter(
      <ThemeProvider>
        <CardDetails person={mockPerson} currentPage={1} />
      </ThemeProvider>
    );

    const closeButton = screen.getByText('CLOSE');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/details/${mockPerson.name}?page=1`
    );
  });

  it('navigates to the correct page when currentPage is not 1', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderWithStateMgmtAndRouter(
      <ThemeProvider>
        <CardDetails person={mockPerson} currentPage={2} />
      </ThemeProvider>,
      { route: '/details/Luke Skywalker' }
    );

    const closeButton = screen.getByText('CLOSE');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/details/${mockPerson.name}?page=2`
    );
  });

  it('handles case when no person is passed', () => {
    const { container } = renderWithStateMgmtAndRouter(
      <ThemeProvider>
        <CardDetails person={null} currentPage={1} />
      </ThemeProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
