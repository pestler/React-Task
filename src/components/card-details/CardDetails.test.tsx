import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router';
import { Person } from '../../types/types';
import CardDetails from './CardDetails';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockedPerson: Person = {
  name: 'Luke Skywalker',
  gender: 'male',
  url: 'https://swapi.dev/api/people',
  height: '172',
  mass: '77',
  hair_color: 'blond',
};

describe('CardDetails Component', () => {
  it('renders correctly and navigates to the correct URL when the close button is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <CardDetails person={mockedPerson} currentPage={0} />
      </MemoryRouter>
    );

    const nameElement = screen.getByText('Luke Skywalker');
    const heightElement = screen.getByText('Height: 172');
    const massElement = screen.getByText('Mass: 77');
    const hairColorElement = screen.getByText('Hair Color: blond');
    const genderElement = screen.getByText('Gender: male');
    const closeButton = screen.getByText('CLOSE');

    expect(nameElement).toBeInTheDocument();
    expect(heightElement).toBeInTheDocument();
    expect(massElement).toBeInTheDocument();
    expect(hairColorElement).toBeInTheDocument();
    expect(genderElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
