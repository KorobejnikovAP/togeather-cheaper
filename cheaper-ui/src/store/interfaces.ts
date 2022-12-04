
export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    password: string;
    email: string;
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