/* import { createSlice } from '@reduxjs/toolkit';
import { Person } from '../../types/types';
import { fetchPeople } from '../../../services/peopleService';

interface PeopleState {
  peoples: Person[];
  totalResults: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: PeopleState = {
  peoples: [],
  totalResults: 0,
  totalPages: 1,
  loading: false,
  error: null,
};

const peopleSlice = createSlice({
  name: 'peoples',
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
        state.peoples = action.payload?.results || [];
        state.totalResults = action.payload?.count || 0;
        state.totalPages = Math.ceil((action.payload?.count || 0) / 10);
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An unexpected error occurred';
      });
  },
});

export const selectPeople = (state: { peoples: PeopleState }) =>
  state.peoples.peoples;
export const selectTotalResults = (state: { peoples: PeopleState }) =>
  state.peoples.totalResults;
export const selectTotalPages = (state: { peoples: PeopleState }) =>
  state.peoples.totalPages;
export const selectLoading = (state: { peoples: PeopleState }) =>
  state.peoples.loading;
export const selectError = (state: { peoples: PeopleState }) =>
  state.peoples.error;

export default peopleSlice.reducer;
 */
