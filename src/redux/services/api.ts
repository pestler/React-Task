import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StarWarsAPIResponse } from '../../types/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<
      StarWarsAPIResponse,
      { searchQuery: string; page: number }
    >({
      query: ({ searchQuery, page }) =>
        searchQuery
          ? `people/?search=${searchQuery}&page=${page}`
          : `people/?page=${page}`,
    }),
  }),
});

export const { useGetPeopleQuery } = api;
