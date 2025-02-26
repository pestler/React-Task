import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Card from './Card';
import { store } from '../../redux/store';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Card Component', () => {
  it('navigates to the details page when clicked', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <Card
                  person={{
                    name: 'Luke Skywalker',
                    gender: 'Male',
                  }}
                  currentPage={1}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('test-card'));

    expect(mockNavigate).toHaveBeenCalledWith('/details/Luke Skywalker?page=1');
  });
  it('navigates to the home page when clicked on the details page', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
          <Routes>
            <Route
              path="/details/:name"
              element={
                <Card
                  person={{
                    name: 'Luke Skywalker',
                    gender: 'Male',
                  }}
                  currentPage={1}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('test-card'));

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });

  it('toggles favorite state when favorite button is clicked', () => {
    const mockDispatch = vi.fn();
    vi.spyOn(store, 'dispatch').mockImplementation(mockDispatch);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <Card
                  person={{
                    name: 'Luke Skywalker',
                    gender: 'Male',
                  }}
                  currentPage={1}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('favorite-button'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        gender: 'Male',
        name: 'Luke Skywalker',
      },
      type: 'favorite/addFavorite',
    });

    fireEvent.click(screen.getByTestId('favorite-button'));

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        gender: 'Male',
        name: 'Luke Skywalker',
      },
      type: 'favorite/addFavorite',
    });
  });
});
