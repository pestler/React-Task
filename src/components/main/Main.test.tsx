import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import Main from './Main';
import { Person } from '../../types/types';

const mockData: Person[] = [
  {
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
  },
  {
    name: 'Darth Vader',
    gender: 'male',
    url: 'https://swapi.dev/api/people',
    birth_year: '41.9BBY',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    created: '2023-01-01T00:00:00.000Z',
    edited: '2023-01-02T00:00:00.000Z',
  },
];

describe('Main Component', () => {
  it('renders loading state correctly', () => {
    render(
      <MemoryRouter>
        <Main data={[]} loading={true} error={null} />
      </MemoryRouter>
    );
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(
      <MemoryRouter>
        <Main data={[]} loading={false} error="Error loading data" />
      </MemoryRouter>
    );
    const errorElement = screen.getByText('error');
    expect(errorElement).toBeInTheDocument();
  });

  it('renders CardList with data correctly', () => {
    render(
      <MemoryRouter>
        <Main data={mockData} loading={false} error={null} />
      </MemoryRouter>
    );

    const lukeElement = screen.getByText('Luke Skywalker');
    const vaderElement = screen.getByText('Darth Vader');
    expect(lukeElement).toBeInTheDocument();
    expect(vaderElement).toBeInTheDocument();
  });

  it('renders error description when no data is available', () => {
    render(
      <MemoryRouter>
        <Main data={[]} loading={false} error={null} />
      </MemoryRouter>
    );
    const errorDescription = screen.getByText('Error description');
    expect(errorDescription).toBeInTheDocument();
  });
});
