import { ajaxReq } from 'Modules/ajax';
import router from 'Routing/router.ts';
import {routes} from 'Routing/constRouting';

export default class MovieModel {

    // data: {
    //     id: number;
    //     name: string;
    //     genre: string;
    //     picture: string;
    //     tagline: string;
    //     age_limit: string;
    //     country: string;
    //     description: string;
    //     duration: string;
    //     kinopoisk_rating: string;
    //     name_picture: string;
    //     rating: string;
    //     staff: string;
    //     trailer: string;
    //     video: string;
    //     year: string;
    // };

    constructor(movieData) {

        this.data = {
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
            year: movieData.year,
        };
    }

    get movieData() {
        return this.data;
    }

    get video() {
        return this.data.video;
    }

    get trailer() {
        return this.data.trailer;
    }

    get id() {
        return this.data.id;
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
                path: `/movie/${id}`,
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
                        movBody: body.data,
                    });
                })
                .catch((err) => {
                    router.go(routes.ERROR_CATCH_VIEW);
                });
        });
    }

    static getMovie(id) {
        return new Promise((movie) => {
            this.movie(id)
                .then((body) => {
                    movie({
                        isAuth: body.isAuth,
                        movBody: body.data,
                    });
                })
                .catch((err) => {
                    router.go(routes.ERROR_CATCH_VIEW);
                });
        });
    }
}
