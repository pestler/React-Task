import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from '../types/type';

const initialState: { uncontrolled: IFormData[]; controlled: IFormData[] } = {
  uncontrolled: [],
  controlled: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledData: (state, action: PayloadAction<IFormData>) => {
      state.uncontrolled.push(action.payload);
    },
    addControlledData: (state, action: PayloadAction<IFormData>) => {
      state.controlled.push(action.payload);
    },
  },
});

export const { addUncontrolledData, addControlledData } = formSlice.actions;

export default formSlice.reducer;
