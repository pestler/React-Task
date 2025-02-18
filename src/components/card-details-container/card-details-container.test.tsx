import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Person } from '../../types/types';
import CardDetailsContainer from './card-details-container';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useParams: () => ({
      name: 'Luke Skywalker',
    }),
  };
});

vi.mock('../card-details/CardDetails', () => ({
  default: ({ person }: { person: Person }) => (
    <div>Mocked CardDetails Component - Name: {person.name}</div>
  ),
}));

describe('CardDetailsContainer Component', () => {
  const mockPerson: Person = {
    name: 'Luke Skywalker',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
    height: '172',
    mass: '77',
    hair_color: 'blond',
  };

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        results: [mockPerson],
      }),
    });
  });

  it('renders loading state correctly', () => {
    render(
      <MemoryRouter>
        <CardDetailsContainer />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays person data correctly', async () => {
    render(
      <MemoryRouter>
        <CardDetailsContainer />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText('Mocked CardDetails Component - Name: Luke Skywalker')
      ).toBeInTheDocument()
    );
  });
});
