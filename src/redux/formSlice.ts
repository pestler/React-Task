import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from '../types/type';
import { AppDispatch } from './store';

interface HighlightState {
  uncontrolled: number | null;
  controlled: number | null;
}

const initialState: {
  uncontrolled: IFormData[];
  controlled: IFormData[];
  highlightedIndex: HighlightState;
} = {
  uncontrolled: [],
  controlled: [],
  highlightedIndex: {
    uncontrolled: null,
    controlled: null,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledData: (state, action: PayloadAction<IFormData>) => {
      state.uncontrolled.push(action.payload);
      state.highlightedIndex.uncontrolled = state.uncontrolled.length - 1;
    },
    addControlledData: (state, action: PayloadAction<IFormData>) => {
      state.controlled.push(action.payload);
      state.highlightedIndex.controlled = state.controlled.length - 1;
    },
    clearHighlight: (
      state,
      action: PayloadAction<'uncontrolled' | 'controlled'>
    ) => {
      state.highlightedIndex[action.payload] = null;
    },
  },
});

export const { addUncontrolledData, addControlledData, clearHighlight } =
  formSlice.actions;

export default formSlice.reducer;

export const setHighlightWithTimeout =
  (type: 'uncontrolled' | 'controlled', delay: number) =>
  (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(clearHighlight(type));
    }, delay);
  };
