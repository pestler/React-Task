import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from './Flyout';
import { RootState } from '../../redux/store';
import favoriteReducer from '../../redux/slices/favoriteSlice';

const mockStore = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
  preloadedState: {
    favorite: {
      peoples: [
        {
          name: 'John Doe',
          gender: 'male',
          height: '180',
          mass: '75',
        },
      ],
    },
  } as Partial<RootState>,
} as const);
describe('Flyout Component', () => {
  it('renders correctly with selected items', () => {
    render(
      <Provider store={mockStore}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('Selected items: 1')).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
    expect(screen.getByText('Download CSV')).toBeInTheDocument();
  });

  it('clears selected items when Clear All button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Clear All'));
    expect(mockStore.getState().favorite.peoples).toHaveLength(0);
  });

  it('downloads CSV when Download CSV button is clicked', () => {
    render(
      <Provider store={mockStore}>
        <Flyout />
      </Provider>
    );

    const link = document.createElement('a');
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(link);
    const appendChildSpy = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => document.createElement('div'));
    const removeChildSpy = vi
      .spyOn(document.body, 'removeChild')
      .mockImplementation(() => document.createElement('div'));
    const revokeObjectURLSpy = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    fireEvent.click(screen.getByText('Download CSV'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(link);
    expect(link.download).toBe('1_items.csv');
    expect(removeChildSpy).toHaveBeenCalledWith(link);
    expect(revokeObjectURLSpy).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });
});
