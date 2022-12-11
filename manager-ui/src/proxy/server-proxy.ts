import { CollectionData, LoginData, ProductData, RegisterData } from "../store/interfaces";

const backendUrl = 'http://localhost:8000';

interface OptionsType {
    method: string;
    headers: Record<string, string>;
    body?: any;
}

let token: string | null = null;
async function makeRequest(method: string, url: string, data?: any): Promise<any> {
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
    if (token) {
        headers.Authorization =  `Token ${token}`;
    }
    const options: OptionsType = {
        method,
        headers,
    }

    if (data) options.body = JSON.stringify(data);

    return fetch(`${backendUrl}${url}`, options)
        .then(async response => {
            if (response.ok) {
                const dataR = await response.json()
                return dataR;
            } 
                throw Error(`Something went wrong: code ${response.status}`)
            
        })
        .catch((err) => {
            console.log(err);
            return null;
        })

}

async function login(data: LoginData) {
    return makeRequest('POST', '/api/login', data);
}

async function register(data: RegisterData){
    return makeRequest('POST', '/api/register', { ...data, user_role: 'manager'});
}

async function getSelf(tokenInternal: string) {
    token = tokenInternal;
    const response = await makeRequest('GET', '/api/user');
    return response;
}

async function createProduct(data: ProductData) {
    const response = await makeRequest('POST', '/api/create_product', data);
    return response;
}

async function getProducts(userId: number) {
    const response = await makeRequest('GET', `/api/profile/${userId}/products`);
    return response;
}

async function createCollection(data: CollectionData) {
    const response = await makeRequest('POST', '/api/create_collection', data);
    return response;
}

async function getCollections() {
    const response = await makeRequest('GET', '/api/collections');
    return response;
}

async function closeCollection(collectionId: number) {
    return [
        {
            id: 1,
            username: 'test',
            address: 'adress',
        }
    ]
}

const serverProxy = {
    auth: {
        login,
        register,
        getSelf,
    },
    products: {
        create: createProduct,
        get: getProducts,
    },
    collections: {
        create: createCollection,
        get: getCollections,
        close: closeCollection,
    }
}

export default serverProxy;