import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  myProfileVisible: false,
};

export const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    setMyProfileVisible: (state, action) => {
      state.myProfileVisible = action.payload;
    },
  },
});

export const {setMyProfileVisible} = myProfileSlice.actions;

export const getMyProfileVisible = state => state.myProfile.myProfileVisible;
export default myProfileSlice.reducer;
