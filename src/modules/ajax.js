export default function ajax({method, path, body}) {
    let status;
    const URL = `http://89.208.228.163:1323/api/v1 + ${path}`;

    return fetch(URL, {
        method,
        body,
    })
        .then((response) => {
            status = response.status;
            return response.json();
        })
        .then((responseBody) => {
            return {
                status,
                responseBody,
            }
        })
        .catch((err) => {
            return err;
        });
}
