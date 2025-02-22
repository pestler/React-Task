import React from 'react';
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
    height: '172',
    mass: '77',
    hair_color: 'blond',
  },
  {
    name: 'Darth Vader',
    gender: 'male',
    url: 'https://swapi.dev/api/people',
    height: '202',
    mass: '136',
    hair_color: 'none',
  },
];

describe('Main Component', () => {
  it('renders loading state correctly', () => {
    render(
      <MemoryRouter>
        <Main data={[]} loading={true} error={null} currentPage={0} />
      </MemoryRouter>
    );
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders no results message when no data is available', () => {
    render(
      <MemoryRouter>
        <Main data={[]} loading={false} error={null} currentPage={0} />
      </MemoryRouter>
    );
    const noResultsMessage = screen.getByText('No results found.');
    expect(noResultsMessage).toBeInTheDocument();
  });

  it('renders data correctly when available', () => {
    render(
      <MemoryRouter>
        <Main data={mockData} loading={false} error={null} currentPage={0} />
      </MemoryRouter>
    );

    const lukeElement = screen.getByText('Luke Skywalker');
    const vaderElement = screen.getByText('Darth Vader');
    expect(lukeElement).toBeInTheDocument();
    expect(vaderElement).toBeInTheDocument();
  });
});
