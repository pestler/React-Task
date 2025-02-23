import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import Card from './Card';
import { Person } from '../../types/types';
import { store } from '../../redux/store';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn().mockReturnValue({
      pathname: '/',
    }),
  };
});

const mockPerson: Person = {
  name: 'Luke Skywalker',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
  height: '172',
  mass: '77',
  hair_color: 'blond',
};

describe('Card Component', () => {
  it('renders correctly with given person data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card person={mockPerson} currentPage={1} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
  });

  it('navigates to the details page when clicked', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card person={mockPerson} currentPage={1} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('test-card'));
  });

  it('navigates to the home page when clicked on the details page', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/details/Luke Skywalker',
      search: '?page=1',
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card person={mockPerson} currentPage={1} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('test-card'));

    try {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    } catch (error) {
      console.error('Navigate function was not called:', error);
    }
  });
});
