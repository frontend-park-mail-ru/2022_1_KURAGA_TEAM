const API_URL = "http://89.208.228.163:1323/api/v1";

function ajax({method, path, body}) {
    let status;
    const URL = API_URL + path;

    return fetch(URL, {
        method,
        body,
    })
        .then((response) => {
            return {
                status,
                responseBody: response.json()
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
    get:    (path) => ajax({path, method: "get"}),
    post:   (params) => ajax({...params, method: "post"}),
};

