import {ajaxReq} from '../modules/ajax.js';
import router from '../routing/router.js';
import {routes} from '../routing/constRouting.js';

export default class MovieModel {

    constructor(movieData) {
        this.movieData = {
            id: movieData.id,
            name: movieData.name,
            genre: movieData.genre,
            picture: movieData.picture,
            tagline: movieData.tagline,
            age_limit: movieData.age_limit,
            country: movieData.country,
            description: movieData.description,
            duration: movieData.duration,
            kinopoisk_rating: movieData.kinopoisk_rating,
            name_picture: movieData.name_picture,
            rating: movieData.rating,
            staff: movieData.staff,
            trailer: movieData.trailer,
            video: movieData.video,
            year: movieData.year
        }
    }

    get movieData() {
        return this.data;
    }

    set movieData(data) {
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

    static async mainHomeMovie() {
        try {
            return await ajaxReq.get({
                path: '/mainMovie',
            });
        } catch (err) {
            return err;
        }
    }


    static async movie(id) {
        try {
            return await ajaxReq.get({
                path: '/movie/' + id,
            });
        } catch (err) {
            return err;
        }
    }


    static mainMov() {
        return new Promise((movie) => {
            this.mainHomeMovie()
                .then((body) => {
                    movie({
                        isAuth: body.isAuth,
                        movBody: body.data
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        });

    }

    static getMovie(id) {
        return new Promise((movie) => {
            this.movie(id)
                .then((body) => {
                    movie({
                        isAuth: body.isAuth,
                        movBody: body.data
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        });

    }
}

