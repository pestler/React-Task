/* import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async ({ query, page }: { query: string; page: number }, { dispatch }) => {
    const result = await dispatch(
      api.endpoints.getPeople.initiate({ searchQuery: query, page: page })
    );
    if (result.error) {
      throw result.error;
    }
    return result.data;
  }
);
 */
