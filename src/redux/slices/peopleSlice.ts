import { createSlice } from '@reduxjs/toolkit';
import { Person } from '../../types/types';
import { fetchPeople } from '../services/peopleService';

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
      .addCase(
        fetchPeople.fulfilled,
        (
          state: {
            loading: boolean;
            people: Person[];
            totalResults: number;
            totalPages: number;
          },
          action: { payload: { results: Person[]; count: number } }
        ) => {
          state.loading = false;
          state.people = action.payload.results;
          state.totalResults = action.payload.count;
          state.totalPages = Math.ceil(action.payload.count / 10);
        }
      )
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
