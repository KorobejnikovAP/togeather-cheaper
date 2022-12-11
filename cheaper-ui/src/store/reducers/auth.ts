import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
        const { token } = action.payload;
        state.token = token;
    },
    setSelf: (state, action) => {
        const { user } = action.payload;
        state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  },
})

export const { setToken, setSelf, logout } = authSlice.actions

export default authSlice.reducer