import { ajaxReq } from './ajax.js';



export async function movies() {
    try {
        return await ajaxReq.get({
            path: '/movieCompilations',
        });
    } catch (err) {
        return err;
    }
}

export async function mainHomeMovie() {
    try {
        return await ajaxReq.get({
            path: '/mainMovie',
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



