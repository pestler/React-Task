import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../../types/types';

interface FavoriteState {
  peoples: Person[];
}

export const initialState: FavoriteState = {
  peoples: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Person>) {
      state.peoples.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.peoples = state.peoples.filter(
        (item) => item.name !== action.payload
      );
    },
    clearFavorites(state) {
      state.peoples = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
