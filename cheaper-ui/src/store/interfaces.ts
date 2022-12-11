
export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    password: string;
    email: string;
}

export interface AdressData {
    user_id: number;
    adress: string;
}

export interface User {
    address: string;
    username: string;
    id: number;
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
    count_current_buyers: number;
    manager: User;
    product: Product;
    id: number;
    is_active: boolean;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}