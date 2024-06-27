import {configureStore} from '@reduxjs/toolkit';
import authTokenReducer from './slices/authTokenSlice';
import filterOptionReducer from './slices/fliterOptionSlice';
import subRedditReducer from './slices/subRedditSlice';
import profileReducer from './slices/profileSlice';
import myProfileReducer from './slices/myProfileSlice';
import savedReducer from './slices/savedSlice';
import settingsReducer from './slices/settingsSlice';
import userNameReducer from './slices/userNameSlice';

export const store = configureStore({
  reducer: {
    authToken: authTokenReducer,
    filterOption: filterOptionReducer,
    subReddit: subRedditReducer,
    profile: profileReducer,
    myProfile: myProfileReducer,
    saved: savedReducer,
    settings: settingsReducer,
    userName: userNameReducer,
  },
});
