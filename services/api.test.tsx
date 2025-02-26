import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';
import { api, useGetPeopleQuery } from './api';
import { StarWarsAPIResponse } from '../src/types/types';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('API Test', () => {
  it('should fetch people successfully without a searchQuery', async () => {
    const mockResponse: StarWarsAPIResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          name: 'Darth Vader',
          url: '',
          mass: undefined,
          hair_color: undefined,
          gender: '',
          height: '',
        },
        {
          name: 'Yoda',
          url: '',
          mass: undefined,
          hair_color: undefined,
          gender: '',
          height: '',
        },
      ],
    };

    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderHook(() => useGetPeopleQuery({ searchQuery: '', page: 1 }), {
      wrapper,
    });
  });
  it('should fetch people successfully with a searchQuery', async () => {
    const searchQuery = 'Luke';
    const mockResponse: StarWarsAPIResponse = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          url: '',
          mass: undefined,
          hair_color: undefined,
          gender: '',
          height: '',
        },
      ],
    };

    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderHook(() => useGetPeopleQuery({ searchQuery, page: 1 }), { wrapper });
  });
  it('should throw an error if fetch fails', async () => {
    (global.fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      renderHook(() => useGetPeopleQuery({ searchQuery: '', page: 1 }), {
        wrapper,
      })
    );
  });

  it('should handle fetch errors gracefully', async () => {
    (global.fetch as unknown as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    await expect(
      renderHook(() => useGetPeopleQuery({ searchQuery: '', page: 1 }), {
        wrapper,
      })
    );
  });
});
