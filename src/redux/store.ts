import { configureStore } from '@reduxjs/toolkit';
import detailedCardReducer from './slices/cardsSlice';
import currentPageReducer from './slices/currentPageSlice';
import peopleReducer from './slices/peopleSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    detailedCard: detailedCardReducer,
    currentPage: currentPageReducer,
    people: peopleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
