import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  savedVisible: false,
};

export const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    setSavedVisible: (state, action) => {
      state.savedVisible = action.payload;
    },
  },
});

export const {setSavedVisible} = savedSlice.actions;

export const getSavedVisible = state => state.saved.savedVisible;
export default savedSlice.reducer;
