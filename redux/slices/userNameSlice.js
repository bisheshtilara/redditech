import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userName: '',
};

export const userNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    setGlobalUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const {setGlobalUserName} = userNameSlice.actions;

export const getUserName = state => state.userName.userName;

export default userNameSlice.reducer;
