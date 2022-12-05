import { createSlice } from '@reduxjs/toolkit'

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    current: [],
  },
  reducers: {
    setCollections: (state, action) => {
      const { collections } = action.payload;
      state.current = collections;
    },
  },
})

export const { setCollections } = collectionsSlice.actions;

export default collectionsSlice.reducer;