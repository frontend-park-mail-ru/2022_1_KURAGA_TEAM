import ajax from "./ajax.js";

async function registration(form) {
    const param = new FormData(form);
    try {
        return await ajax({
            method: "post",
            path: "/reg",
            body: param,
        });
    } catch (err) {
        return err;
    }
}

async function login(form) {
    const param = new FormData(form);
    try {
        return await ajax({
            method: "post",
            path: "/login",
            body: param,
        });
    } catch (err) {
        return err;
    }
}

