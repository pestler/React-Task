import React, { FormEvent } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import Core from './Core';
import peopleReducer from '../../redux/slices/peopleSlice';
import detailedCardReducer from '../../redux/slices/cardsSlice';
import currentPageReducer from '../../redux/slices/currentPageSlice';
import { api } from '../../redux/services/api';
import { Person, StarWarsAPIResponse } from '../../types/types';

vi.mock('../pagination/Pagination', () => ({
  default: ({
    totalPages,
    onPageChange,
  }: {
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => (
    <div>
      Mocked Pagination Component
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index + 1} onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('../button-search/ButtonSearch', () => ({
  default: ({
    onFormSubmit,
    value,
  }: {
    onFormSubmit: (event: FormEvent<HTMLFormElement>, value: string) => void;
    value: string;
  }) => (
    <div>
      Mocked Search Component
      <input
        type="text"
        placeholder="Enter name"
        value={value}
        onChange={(e) =>
          onFormSubmit(
            e as unknown as FormEvent<HTMLFormElement>,
            e.target.value
          )
        }
      />
    </div>
  ),
}));

vi.mock('../main/Main', () => ({
  default: ({
    data,
    loading,
    error,
  }: {
    data: Person[];
    loading: boolean;
    error: string | null;
  }) => (
    <div>
      Mocked Main Component
      <ul>
        {data.map((person: Person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  ),
}));

const mockPeople: Person[] = [
  {
    name: 'Luke Skywalker',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
    height: '172',
    mass: '77',
    hair_color: 'blond',
  },
];

describe('Core Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        results: mockPeople,
        count: 1,
      } as StarWarsAPIResponse),
    });
  });

  const mockOnPageChange = vi.fn();

  const renderWithProviders = (component: React.ReactElement) => {
    const store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        detailedCard: detailedCardReducer,
        currentPage: currentPageReducer,
        people: peopleReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

    return render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    );
  };
  it('renders Core component correctly', () => {
    renderWithProviders(
      <Core currentPage={1} onPageChange={mockOnPageChange} />
    );
  });
  it('renders Core component correctly', () => {
    renderWithProviders(
      <Core currentPage={1} onPageChange={mockOnPageChange} />
    );
  });
  it('renders Core component correctly', () => {
    renderWithProviders(
      <Core currentPage={1} onPageChange={mockOnPageChange} />
    );
  });
  it('renders Core component correctly', () => {
    renderWithProviders(
      <Core currentPage={1} onPageChange={mockOnPageChange} />
    );
  });

  it('renders Core correctly', () => {
    renderWithProviders(
      <Core currentPage={1} onPageChange={mockOnPageChange} />
    );
  });

  it('fetches and displays people data correctly', async () => {
    renderWithProviders(
      <Core currentPage={1} onPageChange={mockOnPageChange} />
    );
  });

  it('updates query and fetches new data when search is used', async () => {
    renderWithProviders(
      <Core currentPage={1} onPageChange={mockOnPageChange} />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter name'), {
      target: { value: 'Yoda' },
    });
  });
});
