import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
  const { data } = await axios.get('/chat/messages');
  return data;
});

export const fetchCreateMessages = createAsyncThunk('chat/fetchCreateMessages', async (params) => {
  const { data } = await axios.post('/chat/messages', params);
  return data;
});

export const fetchEditMessages = createAsyncThunk(
  'chat/fetchEditMessages',
  async ({ id, message }) => {
    const { data } = await axios.put(`/chat/messages/${id}`, { message });
    return data;
  },
);

export const fetchDeleteMessages = createAsyncThunk('chat/fetchDeleteMessages', async (id) => {
  const { data } = await axios.delete(`/chat/messages/${id}`);
  return data;
});

const initialState = {
  chat: {
    messages: [],
    status: 'loading',
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: {
    // ======================
    // get messages
    [fetchMessages.pending]: (state) => {
      state.chat.messages = [];
      state.chat.status = 'loading';
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.chat.messages = action.payload;
      state.chat.status = 'loaded';
    },
    [fetchMessages.rejected]: (state) => {
      state.chat.messages = [];
      state.chat.status = 'error';
    },
    // create message
    [fetchCreateMessages.pending]: (state) => {
      state.chat.messages = [];
      state.chat.status = 'loading';
    },
    [fetchCreateMessages.fulfilled]: (state, action) => {
      state.chat.messages = [...state.chat.messages, action.payload];
      state.chat.status = 'loaded';
    },
    [fetchCreateMessages.rejected]: (state) => {
      state.chat.messages = [];
      state.chat.status = 'error';
    },
    // delete message
    [fetchDeleteMessages.pending]: (state, action) => {
      state.chat.messages = state.chat.messages.filter((item) => item.id !== action.meta.arg);
    },
    // edit update message
    [fetchEditMessages.pending]: (state) => {
      state.chat.messages = [];
      state.chat.status = 'loading';
    },
    [fetchEditMessages.fulfilled]: (state, action) => {
      state.chat.messages = [...state.chat.messages, action.payload];
      state.chat.status = 'loaded';
    },
    [fetchEditMessages.rejected]: (state) => {
      state.chat.messages = [];
      state.chat.status = 'error';
    },
  },
});

export const chatReducer = chatSlice.reducer;
