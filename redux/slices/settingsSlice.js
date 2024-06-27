import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  settingsVisible: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettingsVisible: (state, action) => {
      state.settingsVisible = action.payload;
    },
  },
});

export const {setSettingsVisible} = settingsSlice.actions;

export const getSettingsVisible = state => state.settings.settingsVisible;
export default settingsSlice.reducer;
