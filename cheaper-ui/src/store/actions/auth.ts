import { serverProxy } from "../../proxy/server-proxy";
import { AdressData, AppState, LoginData, RegisterData } from "../interfaces";
import { setToken, setSelf } from "../reducers/auth";
import { AppDispatch } from "../store";

export const loginAsync = (data: LoginData) => async (dispatch: AppDispatch) => {
    const responseData = await serverProxy.auth.login(data);
    dispatch(setToken({ token: responseData.key }));
    dispatch(getUserAsync(responseData.key));
}

export const getUserAsync = (token?: string) => async (dispatch: AppDispatch) => {
    try {
        let user = null;
        user = await serverProxy.auth.getSelf(token);
        if (user.id) dispatch(setSelf({ user }));
    // eslint-disable-next-line no-empty
    } catch (e) {}
}

export const registerAsync = (data: RegisterData) => async (dispatch: AppDispatch) => {
    const responseData = await serverProxy.auth.register(data);
    dispatch(setToken({ token: responseData.key }));
    dispatch(getUserAsync(responseData.key));
}

export const setAdressAsync = (data: AdressData) => async (dispatch: AppDispatch) => {
    const user = await serverProxy.auth.setAdress(data);
    dispatch(setSelf({ user }));
}