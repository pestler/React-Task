import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Core from './Core';
import { Person, StarWarsAPIResponse } from '../../types/types';

vi.mock('./pagination/Pagination', () => ({
  default: ({
    currentPage,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => (
    <div>
      Mocked Pagination Component
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
    </div>
  ),
}));

vi.mock('./search/Search', () => ({
  default: ({
    onFormSubmit,
    value,
  }: {
    onFormSubmit: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string
    ) => void;
    value: string;
  }) => (
    <div>
      Mocked Search Component
      <input
        type="text"
        placeholder="Enter name"
        value={value}
        onChange={(e) => onFormSubmit(e, e.target.value)}
      />
    </div>
  ),
}));

vi.mock('./main/Main', () => ({
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
    birth_year: '19BBY',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    created: '2023-01-01T00:00:00.000Z',
    edited: '2023-01-02T00:00:00.000Z',
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

  it('renders Core correctly', () => {
    render(<Core currentPage={1} onPageChange={mockOnPageChange} />);

    expect(screen.getByText('Mocked Pagination Component')).toBeInTheDocument();
    expect(screen.getByText('Mocked Search Component')).toBeInTheDocument();
    expect(screen.getByText('Mocked Main Component')).toBeInTheDocument();
  });

  it('fetches and displays people data correctly', async () => {
    render(<Core currentPage={1} onPageChange={mockOnPageChange} />);

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
  });

  it('calls onPageChange and fetches new data when pagination is used', async () => {
    render(<Core currentPage={1} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByText('Next Page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
  });

  it('updates query and fetches new data when search is used', async () => {
    render(<Core currentPage={1} onPageChange={mockOnPageChange} />);

    fireEvent.change(screen.getByPlaceholderText('Enter name'), {
      target: { value: 'Yoda' },
    });

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
  });
});
