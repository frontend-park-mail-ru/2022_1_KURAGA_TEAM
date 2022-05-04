import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import carouselTemplate from "Components/carousel/carousel.pug";
import movingCarousel from "Components/carousel/movingCarousel";
import {MovieCompilationData} from "../types";
import MovieClass from "Components/movie/movieClass";

export default class MovieCompilationModel {
    private readonly data: MovieCompilationData;
    private defaultMovies = [{
        id: -1,
        name: "",
        picture: "",
        tagline: "",
        genre: [{id: 0, name: ""}],
        age_limit: "",
        is_movie: true,
        country: "",
        description: "",
        duration: "",
        kinopoisk_rating: "",
        name_picture: "",
        rating: "",
        staff: "",
        trailer: "",
        video: "",
        year: "",
    }]

    constructor(index, movieCompilationData, id?) {
        if (Array.isArray(movieCompilationData)) {
            this.data = {
                movies: movieCompilationData,
                id: index,
                idSerial: id,
            };
        } else {
            if (movieCompilationData.movies == null) {
                this.data = {
                    id: index,
                    compilationName: movieCompilationData.compilation_name,
                    movies: this.defaultMovies,
                };
            } else {
                this.data = {
                    id: index,
                    compilationName: movieCompilationData.compilation_name,
                    movies: movieCompilationData.movies,
                };
            }
        }
    }

    get movieCompilationData() {
        return this.data;
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

    static async movieCompilationMovie(id) {
        try {
            return await ajaxReq.get({
                path: `/movieCompilations/movie/${id}`,
            });
        } catch (err) {
            return err;
        }
    }

    static async movieCompilationPerson(id) {
        try {
            return await ajaxReq.get({
                path: `/movieCompilations/person/${id}`,
            });
        } catch (err) {
            return err;
        }
    }

    static async favorites() {
        try {
            return await ajaxReq.get({
                path: `/favorites`,
            });
        } catch (err) {
            return err;
        }
    }

    static async allMovies(limit, offset) {
        try {
            return await ajaxReq.get({
                path: `/movies?limit=${limit}&offset=${offset}`,
            });
        } catch (err) {
            return err;
        }
    }

    static async allSeries() {
        try {
            return await ajaxReq.get({
                path: `/series`,
            });
        } catch (err) {
            return err;
        }
    }

    static async allGenre(id) {
        try {
            return await ajaxReq.get({
                path: `/movieCompilations/genre/${id}`,
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
                        movCompBody: body.data,
                    });
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getFavorites() {
        return new Promise((movieCompilations) => {
            this.favorites()
                .then((body) => {
                    movieCompilations({
                        isAuth: body.isAuth,
                        movCompBody: body.data,
                    });
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }


    static getMovieCompilationMovie(id) {
        return new Promise((movieCompilation) => {
            this.movieCompilationMovie(id)
                .then((body) => {
                    movieCompilation({
                        isAuth: body.isAuth,
                        movCompBody: body.data,
                    });
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getMovieCompilationPerson(id) {
        return new Promise((movieCompilation) => {
            this.movieCompilationPerson(id)
                .then((body) => {
                    movieCompilation({
                        isAuth: body.isAuth,
                        movCompBody: body.data,
                    });
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getMovies(limit, offset) {
        return new Promise((movieCompilation) => {
            this.allMovies(limit, offset)
                .then((body) => {
                    movieCompilation({
                        isAuth: body.isAuth,
                        movCompBody: body.data,
                    });
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getSeries() {
        return new Promise((movieCompilation) => {
            this.allSeries()
                .then((body) => {
                    movieCompilation({
                        isAuth: body.isAuth,
                        movCompBody: body.data,
                    });
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getGenre(id) {
        return new Promise((movieCompilation) => {
            this.allGenre(id)
                .then((body) => {
                    movieCompilation({
                        isAuth: body.isAuth,
                        movCompBody: body.data,
                    });
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }


}