import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterList from '@/components/CharacterList';

const mockPeople = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
  },
];

test('показывает персонажа и позволяет добавить в избранное', () => {
  const mockClickHandler = jest.fn();

  render(
    <CharacterList
      people={mockPeople}
      selectedPerson={null}
      onPersonClick={mockClickHandler}
      page={1}
    />
  );

  const nameElement = screen.getByText('Luke Skywalker');
  expect(nameElement).toBeInTheDocument();

  const favoriteButton = screen.getByText('♡');
  fireEvent.click(favoriteButton);
  expect(favoriteButton.textContent).toBe('❤️');
});
