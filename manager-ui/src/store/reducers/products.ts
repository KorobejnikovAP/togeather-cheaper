import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    current: [],
  },
  reducers: {
    setProducts: (state, action) => {
      const { products } = action.payload;
      state.current = products;
  },
  },
})

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;