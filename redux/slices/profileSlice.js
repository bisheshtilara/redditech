import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profileVisible: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileVisible: (state, action) => {
      state.profileVisible = action.payload;
    },
  },
});

export const {setProfileVisible} = profileSlice.actions;

export const getProfileVisible = state => state.profile.profileVisible;
export default profileSlice.reducer;
