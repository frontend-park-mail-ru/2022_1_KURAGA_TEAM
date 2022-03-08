const API_URL = "http://localhost:1323/api/v1";

function ajax({method, path, body}) {
    const URL = API_URL + path;

    return fetch(URL, {
        method,
        body,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if (Math.round(response.status / 100) === 4) {
                return {
                    isAuth: false,
                    isError: false,
                    data: response.json()
                        .then((response) => {
                            return response;
                        })
                }
            }

            response.json()
                .then((data) => {
                    return {
                        isAuth: true,
                        isError: false,
                        data,
                    }
                })
        })
        .catch((err) => {
            return {
                isAuth: false,
                isError: true,
                err,
            }
        });
}

export const ajaxReq = {
    get: (params) => ajax({...params, method: "get"}),
    post: (params) => ajax({...params, method: "post"}),
    delete: (params) => ajax({...params, method: "delete"})
};

