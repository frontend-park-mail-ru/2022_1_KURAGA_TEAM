import {ajaxReq} from '../modules/ajax.js';
import router from '../routing/router.js';
import {routes} from '../routing/constRouting.js';

export default class MovieCompilationModel {

    constructor(movieCompilationData) {
        this.movieCompilationData = {
            compilation_name: movieCompilationData.compilation_name,
            movies: movieCompilationData.movies
        }
    }

    get movieCompilationData() {
        return this.data;
    }

    set movieCompilationData(data) {
        this.data = data;
    }


    static async movies() {
        try {
            return await ajaxReq.get({
                path: '/movieCompilations',
            });
        } catch (err) {
            return err;
        }
    }

    static async movieCompilationMovie(id) {
        try {
            return await ajaxReq.get({
                path: '/movieCompilations/movie/' + id,
            });
        } catch (err) {
            return err;
        }
    }

    static async movieCompilationPerson(id) {
        try {
            return await ajaxReq.get({
                path: '/movieCompilations/person/'+ id,
            });
        } catch (err) {
            return err;
        }
    }


    static getMovieCompilations() {
        return new Promise((movieCompilations) => {
            this.movies()
                .then((body) => {
                    movieCompilations({
                        isAuth: body.isAuth,
                        movCompBody: body.data
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        });

    }

    static getMovieCompilationMovie(id) {
        return new Promise((movieCompilation) => {
            this.movieCompilationMovie(id)
                .then((body) => {
                    movieCompilation({
                        isAuth: body.isAuth,
                        movCompBody: body.data
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

    static getMovieCompilationPerson(id) {
        return new Promise((movieCompilation) => {
            this.movieCompilationPerson(id)
                .then((body) => {
                    movieCompilation({
                        isAuth: body.isAuth,
                        movCompBody: body.data
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

}

