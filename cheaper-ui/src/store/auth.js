import { createSlice } from '@reduxjs/toolkit'
import { serverProxy } from '../proxy/server-proxy';

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
    }
  },
})

export const loginAsync = (data) => async (dispatch) => {
    const token = await serverProxy.auth.login(data);
    dispatch(setToken({ token: token.key }));
    dispatch(getUserAsync());
}

export const getUserAsync = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    const user = await serverProxy.auth.getSelf(token);
    dispatch(setSelf({ user }));
}

export const { setToken, setSelf } = authSlice.actions

export default authSlice.reducer