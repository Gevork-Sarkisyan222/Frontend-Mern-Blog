import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './slices/post';
import { authReducer } from './slices/auth';
import changeCommentState from './slices/getCommentChangeSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    changeCommentState,
  },
});
