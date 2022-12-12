import { AdressData, LoginData, RegisterData } from "../store/interfaces";

const backendUrl = 'http://localhost:8000';

interface OptionsType {
    method: string;
    headers: Record<string, string>;
    body?: any;
}

let token: string | null = null;
if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
}

async function makeRequest(method: string, url: string, data?: any): Promise<any> {
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
    if (token) {
        headers['Authorization'] =  `Token ${token}`;
    }
    const options: OptionsType = {
        method,
        headers,
    }

    if (data) options.body = JSON.stringify(data);

    return fetch(`${backendUrl}${url}`, options)
        .then(async response => {
            if (response.ok) {
                data = await response.json()
                return data;
            } else {
                throw Error(`Something went wrong: code ${response.status}`)
            }
        })
        .catch((err) => {
            console.log(err);
            return null;
        })

}

async function login(data: LoginData) {
    return await makeRequest('POST', '/api/login', data);
}

async function register(data: RegisterData){
    return await makeRequest('POST', '/api/register', { ...data, user_role: 'client'});
}

async function getSelf(tokenInternal?: string) {
    if (tokenInternal) {
        token = tokenInternal;
        localStorage.setItem('token', token);
    }
    const response = await makeRequest('GET', '/api/user');
    return response;
}

async function setAdress(data: AdressData) {
    const response = await makeRequest('PATCH', `/api/add_address/${data.user_id}`, data);
    return response;
}

async function getCollections() {
    const response = await makeRequest('GET', '/api/collections');
    response.forEach((c: any) => c.is_active = false)
    return response;
}

async function joinCollection(collectionId: number) {
    const response = await makeRequest('PATCH', `/api/add_user_to_collection/${collectionId}`);
    return response;
}

async function getActiveCollections(userId: number) {
    const response = await makeRequest('GET', `/api/profile/${userId}/collections`);
    return response;
}

export const serverProxy = {
    auth: {
        login,
        register,
        getSelf,
        setAdress,
    },
    collections: {
        get: getCollections,
        join: joinCollection,
        getActive: getActiveCollections,
    }
}