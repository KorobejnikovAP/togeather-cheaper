const backendUrl = 'http://localhost:8000';

async function makeRequest( method, url, token, data) {
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

async function login(data){
    return await makeRequest('POST', '/api/login', undefined, data);
}

async function getSelf(token) {
    const response = await makeRequest('GET', '/api/user', token);
    return response.data;
}

export const serverProxy = {
    auth: {
        login,
        getSelf,
    }
}