import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Person, StarWarsAPIResponse } from '../../types/types';

interface PeopleState {
  people: Person[];
  totalResults: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: PeopleState = {
  people: [],
  totalResults: 0,
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async ({ query, page }: { query: string; page: number }) => {
    const url =
      query === ''
        ? `https://swapi.dev/api/people/?page=${page}`
        : `https://swapi.dev/api/people/?search=${query}&page=${page}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: StarWarsAPIResponse = await response.json();
    return { people: data.results, totalResults: data.count };
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload.people;
        state.totalResults = action.payload.totalResults;
        state.totalPages = Math.ceil(action.payload.totalResults / 10);
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An unexpected error occurred';
      });
  },
});

export const selectPeople = (state: { people: PeopleState }) =>
  state.people.people;
export const selectTotalResults = (state: { people: PeopleState }) =>
  state.people.totalResults;
export const selectTotalPages = (state: { people: PeopleState }) =>
  state.people.totalPages;
export const selectLoading = (state: { people: PeopleState }) =>
  state.people.loading;
export const selectError = (state: { people: PeopleState }) =>
  state.people.error;

export default peopleSlice.reducer;
