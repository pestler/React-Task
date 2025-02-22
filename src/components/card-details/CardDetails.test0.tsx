import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router';
import { Provider } from 'react-redux';
import { store as rootStore } from '../../redux/store';
import CardDetails from './CardDetails';
import { Person } from '../../types/types';

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
      backgroundColor: '#fff',
      color: '#000',
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
  const currentPage = 1;
  //details/Luke Skywalker?page=1

  it('renders correctly with given person data', () => {
    render(
      <Provider store={rootStore}>
        <MemoryRouter>
          <CardDetails
            person={mockPerson}
            currentPage={`page=${currentPage}`}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
  });

  it('navigates to the correct page when the close button is clicked', () => {
    const mockNavigate = vi.fn();
    (useNavigate as unknown as vi.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={rootStore}>
        <MemoryRouter>
          <CardDetails person={mockPerson} currentPage={currentPage} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('CLOSE'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/?page=${currentPage}`);
  });

  it('applies theme styles correctly', () => {
    render(
      <Provider store={rootStore}>
        <MemoryRouter>
          <CardDetails person={mockPerson} currentPage={currentPage} />
        </MemoryRouter>
      </Provider>
    );

    const cardDetails = screen
      .getByText('Luke Skywalker')
      .closest('.card-details');
    expect(cardDetails).toHaveStyle(`background-color: #fff`);
    expect(cardDetails).toHaveStyle(`color: #000`);
  });
});
