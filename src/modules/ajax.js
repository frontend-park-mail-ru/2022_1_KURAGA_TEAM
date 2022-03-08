const API_URL = 'http://movie-space.ru:1323/api/v1';

function checkStatus(status) {
    let statusInfo;

    switch (Math.round(status / 100)) {
    case 4: {
        statusInfo = 'Client Error';

        break;
    }
    case 5: {
        statusInfo = 'Server Error';

        break;
    }
    default: {
        statusInfo = 'Undefined';
    }
    }

    return statusInfo;
}

function ajax({ method, path, body }) {
    const URL = API_URL + path;

    return fetch(URL, {
        method,
        body,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            const statusInfo = checkStatus(response.status);

            if (statusInfo === 'Client Error'
            || statusInfo === 'Server Error'
            || statusInfo === 'Undefined') {
                return {
                    isAuth: false,
                    isError: false,
                    data: response.json()
                        .then((res) => res),
                };
            }

            return {
                isAuth: true,
                isError: false,
                data: response.json()
                    .then((response) => response),
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
    delete: (params) => ajax({ ...params, method: 'delete' }),
};
