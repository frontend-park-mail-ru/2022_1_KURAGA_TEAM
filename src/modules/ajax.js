const API_URL = "http://89.208.228.163:1323/api/v1";

function ajax({method, path, body}) {
    let status;
    const URL = API_URL + path;

    return fetch(URL, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            console.log(response.status);
            if (response.status / 100 === 4) {

                return {
                    isAuth: true,
                    isError: false,
                    data: response.json()
                        .then((response) => {
                            return response;
                        })
                }
            }

            return {
                isAuth: false,
                isError: false,
                data: response.json()
                    .then((response) => {
                        return response;
                    })
            }
        })
        .catch((err) => {
            return err;
        });
}

export const ajaxReq = {
    get: (path) => ajax({path, method: "get"}),
    post: (params) => ajax({...params, method: "post"}),
    delete: (path) => ajax({...params, method: "delete"})
};

