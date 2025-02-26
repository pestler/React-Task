/* import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../../types/types';

interface DetailedCardState {
  selectedCard: Person | null;
}

const initialState: DetailedCardState = {
  selectedCard: null,
};

const DetailedCardSlice = createSlice({
  name: 'detailedCard',
  initialState,
  reducers: {
    setSelectedCard: (state, action: PayloadAction<Person>) => {
      state.selectedCard = action.payload;
    },
    clearSelectedCard: (state) => {
      state.selectedCard = null;
    },
  },
});

export const { setSelectedCard, clearSelectedCard } = DetailedCardSlice.actions;
export default DetailedCardSlice.reducer;
 */
