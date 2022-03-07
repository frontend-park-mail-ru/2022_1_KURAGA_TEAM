import ajax from "./ajax.js";

export async function registration(form) {
    const param = new FormData(form);
    try {
        return await ajax({
            method: "post",
            path: "/singup",
            body: param,
        });
    } catch (err) {
        return err;
    }
}

export async function login(form) {
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

export async function logout(form) {
    const param = new FormData(form);
    try {
        return await ajax({
            method: "post",
            path: "/",
            body: param,
        });
    } catch (err) {
        return err;
    }
}

export async function profile() {
    try {
        return await ajax({
            method: "get",
            path: "/"
        });
    } catch (err) {
        return err;
    }
}

