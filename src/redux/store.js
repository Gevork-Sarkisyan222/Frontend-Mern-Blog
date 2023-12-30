import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './slices/post';
import { authReducer } from './slices/auth';
import { chatReducer } from './slices/chat';
import changeCommentState from './slices/getCommentChangeSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    chat: chatReducer,
    changeCommentState,
  },
});
