const backendUrl = 'http://localhost:8000';

async function makeRequest( method: string, url: string, token: string | null, data: any): Promise<any> {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
    if (token) {
        headers['Authorization'] =  `Token ${token}`;
    }
    const options = {
        method,
        headers,
    }

    if (data) options.body = JSON.stringify(data);
    console.log(options);
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

async function login(data: LoginData){
    return await makeRequest('POST', '/api/login', null, data);
}


export const serverProxy: ServerProxy = {
    auth: {
        login,
    }
}

interface ServerProxy {
    auth: {
        login: (data: LoginData) => Promise<any>;
    }
}