import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textToChange: '',
};

export const getCommentChangeSlice = createSlice({
  name: 'changeComment',
  initialState,
  reducers: {
    setTextToChange: (state, action) => {
      state.textToChange = action.payload;
    },
  },
});

export const { setTextToChange } = getCommentChangeSlice.actions;
export default getCommentChangeSlice.reducer;
