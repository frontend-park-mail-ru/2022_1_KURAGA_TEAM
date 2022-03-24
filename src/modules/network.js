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
            path: '/profile',
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

export async function movie(id) {
    try {
        return await ajaxReq.get({
            path: '/movie/' + id,
        });
    } catch (err) {
        return err;
    }
}

export async function movieCompilationMovie(id) {
    try {
        return await ajaxReq.get({
            path: '/movieCompilations/movie/'+ id,
        });
    } catch (err) {
        return err;
    }
}

export async function person(id) {
    try {
        return await ajaxReq.get({
            path: '/person/' + id,
        });
    } catch (err) {
        return err;
    }
}

export async function movieCompilationPerson(id) {
    try {
        return await ajaxReq.get({
            path: '/movieCompilations/person/'+ id,
        });
    } catch (err) {
        return err;
    }
}


export async function edit(form) {
    try {
        return await ajaxReq.put({
            path: '/edit',
            body: form,
        });
    } catch (err) {
        return err;
    }
}

export async function avatar(form) {
    try {
        return await ajaxReq.put({
            path: '/avatar',
            body: form,
            headers: {

            }
        });
    } catch (err) {
        return err;
    }
}


