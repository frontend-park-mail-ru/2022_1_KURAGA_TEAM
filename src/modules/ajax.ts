const API_URL = 'http://localhost:1323/api/v1';
//const API_URL = 'http://movie-space.ru:1323/api/v1';

function checkStatus(status: number): string {
    switch (Math.round(status / 100)) {
    case 1: {
        return 'Information';
    }
    case 2: {
        return 'Success';
    }
    case 3: {
        return 'Redirect';
    }
    case 4: {
        return 'Client Error';
    }
    case 5: {
        return 'Server Error';
    }
    default: {
        return;
    }
    }
}

function ajax(
    { method, path, body, headers = {'Content-Type': 'application/json'} }
        : {method: string, path: string, body: any, headers: {"Content-Type": string}})
    : Promise<{isAuth: boolean, isError: boolean, data: Promise<object>}
    | {isAuth: boolean, isError: boolean, err: any}> {
    const URL = API_URL + path;

    return fetch(URL, {
        method,
        body,
        credentials: 'include',
        headers,
    })
        .then((response) => {
            const statusInfo = checkStatus(response.status);

            if (statusInfo === 'Client Error'
            || statusInfo === 'Server Error'
            || statusInfo === 'Undefined') {
                return {
                    isAuth: false,
                    isError: false,
                    data: response.json(),
                };
            }

            return {
                isAuth: true,
                isError: false,
                data: response.json(),
            };
        })
        .catch((err) => ({

            isAuth: false,
            isError: true,
            err,
        }));
}

export const ajaxReq = {
    get: (params) => ajax({ ...params, method: 'get' }),
    post: (params) => ajax({ ...params, method: 'post' }),
    put: (params) => ajax({ ...params, method: 'put' }),
    delete: (params) => ajax({ ...params, method: 'delete' }),
};
