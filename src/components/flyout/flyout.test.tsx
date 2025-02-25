import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import Flyout from './Flyout';
import favoriteReducer from '../../redux/slices/favoriteSlice';

const initialState = {
  favorite: {
    peoples: [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }],
  },
};

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
  preloadedState: {
    favorite: {
      peoples: initialState.favorite.peoples.map((person) => ({
        ...person,
        url: '',
        mass: '',
        hair_color: '',
        gender: '',
        height: '',
      })),
    },
  },
});
describe('Flyout Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
  });

  it('clears selected items when Clear All button is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);

    expect(store.getState().favorite.peoples).toHaveLength(0);
  });

  it('generates CSV when Download CSV button is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
  });
});
