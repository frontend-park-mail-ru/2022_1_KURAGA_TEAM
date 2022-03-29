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
        return this._u;
    }

    set movieCompilationData(data) {
        this._u = {
            compilation_name: data.compilation_name,
            movies: data.movies
        }
    }


    async movies() {
        try {
            return await ajaxReq.get({
                path: '/movieCompilations',
            });
        } catch (err) {
            return err;
        }
    }

    async movieCompilationMovie(id) {
        try {
            return await ajaxReq.get({
                path: '/movieCompilations/movie/' + id,
            });
        } catch (err) {
            return err;
        }
    }

    async movieCompilationPerson(id) {
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
            this.prototype.movies()
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
            this.prototype.movieCompilationMovie(id)
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
            this.prototype.movieCompilationPerson(id)
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

