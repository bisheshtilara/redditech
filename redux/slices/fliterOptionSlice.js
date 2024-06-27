import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filterOption: 'hot',
};

export const filterOptionSlice = createSlice({
  name: 'filterOption',
  initialState,
  reducers: {
    setFilterOption: (state, action) => {
      state.filterOption = action.payload;
    },
  },
});

export const {setFilterOption} = filterOptionSlice.actions;

export const getFilterOption = state => state.filterOption.filterOption;

export default filterOptionSlice.reducer;
