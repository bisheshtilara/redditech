import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

export const authTokenSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {setAuthToken} = authTokenSlice.actions;

export const getAccessToken = state => state.authToken.token;

export default authTokenSlice.reducer;
