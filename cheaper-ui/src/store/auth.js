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
    data = { username: 'admin', password: 'admin123' }
    const token = await serverProxy.auth.login(data);
    console.log(token);
    dispatch(setToken({ token: token.key }));
}

export const getUserAsync = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log(getState());
    const user = await serverProxy.auth.getSelf(token);
    console.log(user);
    dispatch(setSelf({ user }));
}

export const { setToken, setSelf } = authSlice.actions

export default authSlice.reducer