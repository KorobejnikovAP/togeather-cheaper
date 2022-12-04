import { LoginData, RegisterData } from "../store/interfaces";

const backendUrl = 'http://localhost:8000';

interface OptionsType {
    method: string;
    headers: Record<string, string>;
    body?: any;
}

async function makeRequest(method: string, url: string, token: string | null, data?: any): Promise<any> {
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
    return makeRequest('POST', '/api/login', null, data);
}

async function register(data: RegisterData){
    return makeRequest('POST', '/api/register', null, { ...data, user_role: 'manager'});
}

async function getSelf(token: string) {
    const response = await makeRequest('GET', '/api/user', token);
    return response;
}

const serverProxy = {
    auth: {
        login,
        register,
        getSelf,
    }
}

export default serverProxy;