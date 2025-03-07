import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';
import { MemoryRouter } from 'react-router-dom';

// Мокаем контекст темы
vi.mock('../theme-context/useTheme', () => ({
  useTheme: () => ({
    theme: { backgroundColor: '#fff', color: '#000' },
  }),
}));

describe('Card Component', () => {
  const mockOnClick = vi.fn();
  const mockSetSelectedItems = vi.fn();

  const selectedItems = [{ id: 1, name: 'Luke Skywalker' }];

  it('renders correctly with name and styles from theme', () => {
    render(
      <MemoryRouter>
        <Card
          id={1}
          name="Luke Skywalker"
          onClick={mockOnClick}
          selectedItems={[]}
          setSelectedItems={mockSetSelectedItems}
        />
      </MemoryRouter>
    );

    const cardElement = screen.getByText('Luke Skywalker');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveStyle('color: #000');
  });

  it('navigates to the details page when clicked', () => {
    render(
      <MemoryRouter>
        <Card
          id={1}
          name="Luke Skywalker"
          onClick={mockOnClick}
          selectedItems={[]}
          setSelectedItems={mockSetSelectedItems}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('View Details'));

    expect(mockOnClick).toHaveBeenCalledWith(1);
  });

  it('toggles favorite state when favorite button is clicked', () => {
    render(
      <MemoryRouter>
        <Card
          id={1}
          name="Luke Skywalker"
          onClick={mockOnClick}
          selectedItems={[]}
          setSelectedItems={mockSetSelectedItems}
        />
      </MemoryRouter>
    );

    const favoriteButton = screen.getByTestId('favorite-button');

    // Состояние "неизбранное"
    fireEvent.click(favoriteButton);
    expect(mockSetSelectedItems).toHaveBeenCalledWith([
      { id: 1, name: 'Luke Skywalker' },
    ]);

    // Состояние "избранное"
    fireEvent.click(favoriteButton);
    expect(mockSetSelectedItems).toHaveBeenCalledWith([]);
  });

  it('applies theme styles', () => {
    render(
      <MemoryRouter>
        <Card
          id={2}
          name="Darth Vader"
          onClick={mockOnClick}
          selectedItems={selectedItems}
          setSelectedItems={mockSetSelectedItems}
        />
      </MemoryRouter>
    );

    const cardContainer = screen.getByText('Darth Vader').closest('div');
    expect(cardContainer).toHaveStyle('background-color: #fff');
    expect(cardContainer).toHaveStyle('color: #000');
  });
});
