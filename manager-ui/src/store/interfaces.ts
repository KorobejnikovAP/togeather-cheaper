
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
    address: string;
}

export interface AppState {
    auth: {
        token: string | null;
        user: User | null;
    },
    products: {
        current: Product[],
    },
    collections: {
        current: Collection[],
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

export interface CollectionData {
    count_for_buy: number;
    name_product: string;
}

export interface Collection {
    count_for_buy: number;
    count_current_buyers: number;
    manager: User;
    product: Product;
    id: number;
}