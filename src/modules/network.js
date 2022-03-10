import { ajaxReq } from './ajax.js';

export async function registration(form) {
    try {
        return await ajaxReq.post({
            path: '/signup',
            body: form,
        });
    } catch (err) {
        return err;
    }
}

export async function login(form) {
    try {
        return await ajaxReq.post({
            path: '/login',
            body: form,
        });
    } catch (err) {
        return err;
    }
}

export async function logout() {
    try {
        return await ajaxReq.delete({
            path: '/logout',
        });
    } catch (err) {
        return err;
    }
}

export async function profile() {
    try {
        return await ajaxReq.get({
            path: '/',
        });
    } catch (err) {
        return err;
    }
}

export async function movies() {
    try {
        return await ajaxReq.get({
            path: '/movieCompilations',
        });
    } catch (err) {
        return err;
    }
}
