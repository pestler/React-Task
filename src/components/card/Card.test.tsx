import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate, useLocation } from 'react-router';
import Card from './Card';
import { Person } from '../../types/types';

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
      <MemoryRouter>
        <Card person={mockPerson} currentPage={0} />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
  });

  it('navigates to the details page when clicked', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Card person={mockPerson} currentPage={0} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('test-card'));
    expect(mockNavigate).toHaveBeenCalledWith('/details/Luke Skywalker?page=0');
  });

  it('navigates to the home page when clicked on the details page', () => {
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/details/Luke Skywalker',
      search: '?page=0',
    });

    render(
      <MemoryRouter>
        <Card person={mockPerson} currentPage={0} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('test-card'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
