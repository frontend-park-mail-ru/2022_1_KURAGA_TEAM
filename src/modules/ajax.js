export default function ajax({method, path, body}) {
    let status;

    return fetch(path, {
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
            status = err.status;
            return {
                status,
                err,
            }
        });
}
