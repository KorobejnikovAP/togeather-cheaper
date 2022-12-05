import { createSlice } from '@reduxjs/toolkit'
import { Collection } from '../interfaces';

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    current: [],
    collections: [],
  },
  reducers: {
    setCollections: (state, action) => {
      const { collections } = action.payload;
      state.current = collections;
      state.collections = collections;
    },
    searchCollections: (state, action) => {
      const search  = action.payload;
      if (search) {
        state.current = state.collections.filter((collection: Collection) => collection.product.name.includes(search))
      } else {
        state.current = [...state.collections];
      }
    }
  },
})

export const { setCollections, searchCollections } = collectionsSlice.actions;

export default collectionsSlice.reducer;