import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePosts = createAsyncThunk('posts/fetchRemovePosts', async (id) => {
  axios.delete(`/posts/${id}`);
});

// comments
export const fetchGetComments = createAsyncThunk('posts/fetchGetComments', async () => {
  const { data } = await axios.get('/posts/comments/all');
  return data;
});

export const fetchCreateComments = createAsyncThunk('posts/fetchCreateComments', async (params) => {
  const { data } = await axios.post('/posts/comments', params);
  return data;
});

export const fetchRemoveComments = createAsyncThunk('posts/fetchRemoveComments', async (id) => {
  axios.delete(`/posts/comments/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    text: [],
    status: 'loading',
  },
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // ======================
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    // delete remove
    [fetchRemovePosts.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
    // comments get
    [fetchGetComments.pending]: (state) => {
      state.comments.text = [];
      state.comments.status = 'loading';
    },
    [fetchGetComments.fulfilled]: (state, action) => {
      state.comments.text = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchGetComments.rejected]: (state) => {
      state.comments.text = [];
      state.comments.status = 'error';
    },
    // comments create
    [fetchCreateComments.pending]: (state) => {
      state.comments.text = [];
      state.comments.status = 'loading';
    },
    [fetchCreateComments.fulfilled]: (state, action) => {
      state.comments.text = [...state.comments.text, action.payload];
      state.comments.status = 'loaded';
    },
    [fetchCreateComments.rejected]: (state) => {
      state.comments.text = [];
      state.comments.status = 'error';
    },
    // delete comment
    [fetchRemoveComments.pending]: (state, action) => {
      state.comments.text = state.comments.text.filter((item) => item.id !== action.meta.arg);
    },
  },
});

export const postReducer = postSlice.reducer;
