import { configureStore, combineReducers } from '@reduxjs/toolkit';
import detailedCardReducer from './slices/cardsSlice';
import currentPageReducer from './slices/currentPageSlice';
import peopleReducer from './slices/peoplesSlice';
import favoriteReducer from './slices/favoriteSlice';
import { api } from './services/api';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  detailedCard: detailedCardReducer,
  currentPage: currentPageReducer,
  peoples: peopleReducer,
  favorite: favoriteReducer,
});

export const selectCurrentPage = (state: RootState) => state.currentPage;
export const selectDetailedCard = (state: RootState) => state.detailedCard;
export const selectPeople = (state: RootState) => state.peoples;
export const selectFavorite = (state: RootState) => state.favorite;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
