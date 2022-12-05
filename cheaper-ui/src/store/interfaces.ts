
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
    collections: {
        collections: Collection[],
        current: Collection[],
    }
}

export interface Collection {
    count_for_buy: number;
    manager: User;
    product: Product;
    id: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}