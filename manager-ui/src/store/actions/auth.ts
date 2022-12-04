import serverProxy from "../../proxy/server-proxy";
import { AppState, LoginData, RegisterData } from "../interfaces";
import { setToken, setSelf } from "../reducers/auth";
import { AppDispatch } from "../store";

export const getUserAsync = () => async (dispatch: AppDispatch, getState: ()=> AppState) => {
    const { token } = getState().auth;
    let user = null;
    if (token) user = await serverProxy.auth.getSelf(token);
    dispatch(setSelf({ user }));
}

export const loginAsync = (data: LoginData) => async (dispatch: AppDispatch) => {
    const responseData = await serverProxy.auth.login(data);
    dispatch(setToken({ token: responseData.key }));
    dispatch(getUserAsync());
}

export const registerAsync = (data: RegisterData) => async (dispatch: AppDispatch) => {
    const responseData = await serverProxy.auth.register(data);
    dispatch(setToken({ token: responseData.key }));
    dispatch(getUserAsync());
}