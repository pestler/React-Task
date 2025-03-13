import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  termsAccepted: boolean;
  picture: string; // base64-encoded picture
  country: string;
}

const initialState: { uncontrolled: FormData[]; controlled: FormData[] } = {
  uncontrolled: [],
  controlled: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUncontrolledData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolled.push(action.payload);
    },
    addControlledData: (state, action: PayloadAction<FormData>) => {
      state.controlled.push(action.payload);
    },
  },
});

export const { addUncontrolledData, addControlledData } = formSlice.actions;

export default formSlice.reducer;
