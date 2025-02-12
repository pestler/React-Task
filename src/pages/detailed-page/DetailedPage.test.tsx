import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router';
import DetailedPage from './DetailedPage';
import { Person } from '../../types/types';

const mockPerson: Person = {
  name: 'Luke Skywalker',
  gender: 'male',
  url: 'https://swapi.dev/api/people',
  birth_year: '19BBY',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  created: '2023-01-01T00:00:00.000Z',
  edited: '2023-01-02T00:00:00.000Z',
};

describe('DetailedPage Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        results: [mockPerson],
      }),
    });
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/details/Luke']}>
        <Routes>
          <Route path="/details/:name" element={<DetailedPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays the person details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/details/Luke']}>
        <Routes>
          <Route path="/details/:name" element={<DetailedPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
  });
});
