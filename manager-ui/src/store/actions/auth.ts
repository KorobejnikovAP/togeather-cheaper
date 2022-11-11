import { serverProxy } from "server-proxy/server-proxy";
import { setToken } from "store/reducers/auth";
import { AppDispatch } from "store/store";


export const loginAsync = (data: LoginData) => async (dispatch: AppDispatch) => {
    const token = await serverProxy.auth.login(data);
    dispatch(setToken({ token: token.key }));
    // dispatch(getUserAsync());
}

// export const getUserAsync = () => async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const user = await serverProxy.auth.getSelf(token);
//     dispatch(setSelf({ user }));
// }

// export const registerAsync = (data: RegisterData) => async (dispatch) => {
//     const token = await serverProxy.auth.register(data);
//     dispatch(setToken({ token: token.key }));
//     dispatch(getUserAsync());
// }