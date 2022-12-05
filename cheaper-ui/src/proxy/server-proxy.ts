import { LoginData, RegisterData } from "../store/interfaces";

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

async function getSelf(tokenInternal: string) {
    token = tokenInternal;
    const response = await makeRequest('GET', '/api/user');
    return response;
}

async function getCollections() {
    const response = await makeRequest('GET', '/api/collections');
    return response;
}

export const serverProxy = {
    auth: {
        login,
        register,
        getSelf,
    },
    collections: {
        get: getCollections,
    }
}