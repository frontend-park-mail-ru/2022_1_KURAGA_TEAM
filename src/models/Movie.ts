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

        if (this.movieData.season == null) {
            return true;
        }
        return this.data.is_movie;
    }

    get seasonsData() {
        this.movieData.season.forEach((value, index) => {
            if (value.episodes === null) {
                value.episodes = [{name: "Cерия пока недоступна"}];
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
        return new Promise<{ movie: MovieData }>((movie) => {
            this.mainHomeMovie()
                .then(({data}) => {
                    data
                        .then((movieBody) => {
                            movie({
                                movie: movieBody
                            })

                        })
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getMovie(id) {
        return new Promise<{ movie: MovieData }>((movie) => {
            this.movie(id)
                .then(({isAuth, data}) => {
                    data
                        .then((movieBody) => {
                            if (isAuth) {
                                // movieBody = {"id":1,"name":"Аватар","is_movie":true,"name_picture":"https://movie-space.ru/api/v1/minio/logos/Avatar.webp","year":2009,"duration":"2 часа 42 минуты","age_limit":12,"description":"Бывший морпех Джейк Салли прикован к инвалидному креслу. Несмотря на немощное тело, Джейк в душе по-прежнему остается воином. Он получает задание совершить путешествие в несколько световых лет к базе землян на планете Пандора, где корпорации добывают редкий минерал, имеющий огромное значение для выхода Земли из энергетического кризиса.","kinopoisk_rating":7.9,"rating":7,"tagline":"Это новый мир","picture":"https://movie-space.ru/api/v1/minio/posters/Avatar.webp","video":"https://movie-space.ru/api/v1/minio/movie/Avatar.mp4","trailer":"https://movie-space.ru/api/v1/minio/trailers/Avatar.mp4","season":null,"country":["США","Великобритания"],"genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"staff":[{"id":6,"name":"Джеймс Кэмерон","photo":"https://movie-space.ru/api/v1/minio/persons/JamesCameron.webp","position":"Режиссер"}]};
                                movie({
                                    movie: movieBody,
                                });
                            } else {
                                movie({
                                    movie: null,
                                });
                            }

                        })

                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }


}
