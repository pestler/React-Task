import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Person } from '../../types/types';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import CardList from './Card-list';

vi.mock('../card/Card', () => ({
  default: ({ person }: { person: Person }) => (
    <div>Mocked Card Component - Name: {person.name}</div>
  ),
}));

vi.mock('../flyout/Flyout', () => ({
  default: () => <div>Mocked Flyout Component</div>,
}));

describe('CardList Component', () => {
  const mockData: Person[] = [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
      height: '172',
      mass: '77',
      hair_color: 'blond',
    },
    {
      name: 'Darth Vader',
      gender: 'male',
      url: 'https://swapi.dev/api/people/4/',
      height: '202',
      mass: '136',
      hair_color: 'none',
    },
  ];

  it('renders loading state correctly', () => {
    render(
      <ThemeProvider>
        <CardList data={[]} loading={true} error={null} currentPage={1} />
      </ThemeProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(
      <ThemeProvider>
        <CardList
          data={[]}
          loading={false}
          error="Error loading data"
          currentPage={1}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  it('renders no results state correctly', () => {
    render(
      <ThemeProvider>
        <CardList data={[]} loading={false} error={null} currentPage={1} />
      </ThemeProvider>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders data correctly', () => {
    render(
      <ThemeProvider>
        <CardList
          data={mockData}
          loading={false}
          error={null}
          currentPage={1}
        />
      </ThemeProvider>
    );

    expect(
      screen.getByText('Mocked Card Component - Name: Luke Skywalker')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Mocked Card Component - Name: Darth Vader')
    ).toBeInTheDocument();
  });

  it('renders Flyout component correctly', () => {
    render(
      <ThemeProvider>
        <CardList data={[]} loading={false} error={null} currentPage={1} />
      </ThemeProvider>
    );

    expect(screen.getByText('Mocked Flyout Component')).toBeInTheDocument();
  });

  it('applies theme styles correctly', () => {
    render(
      <ThemeProvider>
        <CardList
          data={mockData}
          loading={false}
          error={null}
          currentPage={1}
        />
      </ThemeProvider>
    );
  });
});
