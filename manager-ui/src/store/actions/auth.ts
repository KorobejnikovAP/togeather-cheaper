import serverProxy from "../../proxy/server-proxy";
import { AppState, LoginData, RegisterData } from "../interfaces";
import { setToken, setSelf } from "../reducers/auth";
import { AppDispatch } from "../store";

export const getUserAsync = (token: string) => async (dispatch: AppDispatch) => {
    let user = null;
    if (token) user = await serverProxy.auth.getSelf(token);
    dispatch(setSelf({ user }));
    dispatch(setToken({ token }));
}

export const loginAsync = (data: LoginData) => async (dispatch: AppDispatch) => {
    const responseData = await serverProxy.auth.login(data);
    dispatch(getUserAsync(responseData.key));
}

export const registerAsync = (data: RegisterData) => async (dispatch: AppDispatch) => {
    const responseData = await serverProxy.auth.register(data);
    dispatch(getUserAsync(responseData.key));
}