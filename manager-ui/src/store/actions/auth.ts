import serverProxy from "../../proxy/server-proxy";
import { AppState, LoginData, RegisterData } from "../interfaces";
import { setToken, setSelf } from "../reducers/auth";
import { AppDispatch } from "../store";

export const getUserAsync = (token?: string) => async (dispatch: AppDispatch) => {
    try {
        let user = null;
        user = await serverProxy.auth.getSelf(token);
        if (user.id) dispatch(setSelf({ user }));
    // eslint-disable-next-line no-empty
    } catch (e) {}
}

export const loginAsync = (data: LoginData) => async (dispatch: AppDispatch) => {
    const responseData = await serverProxy.auth.login(data);
    dispatch(getUserAsync(responseData.key));
}

export const registerAsync = (data: RegisterData) => async (dispatch: AppDispatch) => {
    const responseData = await serverProxy.auth.register(data);
    dispatch(getUserAsync(responseData.key));
}