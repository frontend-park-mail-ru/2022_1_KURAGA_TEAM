import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import {MovieData} from "../types";

export default class MovieModel {
    data: MovieData;

    constructor(movieData: MovieData) {
        this.data = movieData;
    }

    get movieData() {
        return this.data;
    }

    get checkMovie() {
        if(this.movieData.season == null){
            return true;
        }
        return this.data.is_movie;
    }

    get seasonsData() {
        this.movieData.season.forEach((value,index)=>{
            if (value.episodes === null){
                value.episodes = [{name:"Cерия пока недоступна"}];
            }
        })
        return this.movieData.season;
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
                path: "/movieCompilations",
            });
        } catch (err) {
            return err;
        }
    }

    static async mainHomeMovie() {
        try {
            return await ajaxReq.get({
                path: "/mainMovie",
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
