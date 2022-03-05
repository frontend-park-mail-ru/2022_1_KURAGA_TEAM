import ajax from "./ajax.js";

async function registration(form) {
    try {
        return await ajax({
            method: "post",
            path: "/reg",
            body: form,
        });
    } catch (err) {
        return err;
    }
}
