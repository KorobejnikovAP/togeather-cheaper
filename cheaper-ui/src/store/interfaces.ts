
export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {

}

export interface User {
    username: string;
}

export interface AppState {
    auth: {
        token: string | null;
        user: User | null;
    }
}