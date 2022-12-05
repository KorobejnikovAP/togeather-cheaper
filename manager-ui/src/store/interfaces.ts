
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
    id: number;
    username: string;
}

export interface AppState {
    auth: {
        token: string | null;
        user: User | null;
    },
    products: {
        current: Product[],
    }
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface ProductData {
    name_product: string;
    price: number;
}