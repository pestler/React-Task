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
  birth_year: '19BBY',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  created: '2023-01-01T00:00:00.000Z',
  edited: '2023-01-02T00:00:00.000Z',
};

describe('CardDetails Component', () => {
  it('renders correctly and navigates to the correct URL when the close button is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <CardDetails person={mockedPerson} />
      </MemoryRouter>
    );

    const nameElement = screen.getByText('Luke Skywalker');
    const heightElement = screen.getByText('Height: 172');
    const massElement = screen.getByText('Mass: 77');
    const hairColorElement = screen.getByText('Hair Color: blond');
    const skinColorElement = screen.getByText('Skin Color: fair');
    const eyeColorElement = screen.getByText('Eye Color: blue');
    const birthYearElement = screen.getByText('Birth Year: 19BBY');
    const genderElement = screen.getByText('Gender: male');
    const createdElement = screen.getByText(
      'Created: 2023-01-01T00:00:00.000Z'
    );
    const editedElement = screen.getByText('Edited: 2023-01-02T00:00:00.000Z');
    const closeButton = screen.getByText('CLOSE');

    expect(nameElement).toBeInTheDocument();
    expect(heightElement).toBeInTheDocument();
    expect(massElement).toBeInTheDocument();
    expect(hairColorElement).toBeInTheDocument();
    expect(skinColorElement).toBeInTheDocument();
    expect(eyeColorElement).toBeInTheDocument();
    expect(birthYearElement).toBeInTheDocument();
    expect(genderElement).toBeInTheDocument();
    expect(createdElement).toBeInTheDocument();
    expect(editedElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
