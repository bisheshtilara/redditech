import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  subRedditVisible: false,
  subRedditName: '',
};

export const subRedditSlice = createSlice({
  name: 'subReddit',
  initialState,
  reducers: {
    setSubRedditVisible: (state, action) => {
      state.subRedditVisible = action.payload;
    },
    setSubRedditName: (state, action) => {
      state.subRedditName = action.payload;
    },
  },
});

export const {setSubRedditVisible, setSubRedditName} = subRedditSlice.actions;

export const getSubRedditVisible = state => state.subReddit.subRedditVisible;
export const getSubRedditName = state => state.subReddit.subRedditName;

export default subRedditSlice.reducer;
