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
        id: 0,
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
                    router.go(routes.ERROR_CATCH_VIEW);
                });
        });
    }

    static getFavorites() {
        return new Promise((movieCompilations) => {
            this.favorites()
                .then((body) => {
                    // const result = [{
                    //     compilation_name: 'Фильмы', movies: [
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         }, {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         }]
                    // }, {
                    //     compilation_name: 'Сериалы', movies: [
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         }, {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Зеленая миля',
                    //             genre: [{id: 0, name: "жанр"}],
                    //             picture: 'http://movie-space.ru:8000/api/v1/posters/TheGreenMile.webp'
                    //         }]
                    // }]
                    // const fulfilled = Promise.resolve(result);
                    // body = {
                    //     isAuth: true,
                    //     data: fulfilled,
                    // }
                    movieCompilations({
                        isAuth: body.isAuth,
                        movCompBody: body.data,
                    });
                })
                .catch((err) => {
                    router.go(routes.ERROR_CATCH_VIEW);
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
                    router.go(routes.ERROR_CATCH_VIEW);
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
                    router.go(routes.ERROR_CATCH_VIEW);
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
                    router.go(routes.ERROR_CATCH_VIEW);
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
                    router.go(routes.ERROR_CATCH_VIEW);
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
                .catch(() => {
                    router.go(routes.ERROR_CATCH_VIEW);
                });
        });
    }

    render() {
        const Series = new MovieClass(this.data.movies, "", false, this.data.id, this.data.idSerial);
        const Top = new MovieClass(this.data.movies, "Top", true);
        const unTop = new MovieClass(this.data.movies, "", true);

        const common = {
            car: `js-carousel${this.data.id}`,
            prevBtn: `js-carousel${this.data.id}__prev`,
            nextBtn: `js-carousel${this.data.id}__next`,
            wrapMov: `js-carousel${this.data.id}__wrap`,
            compilationName: this.data.compilationName,
        };


        if (this.data.compilationName === "Лучшее за 2011 год") {
            return carouselTemplate({
                ...common,
                items: Top.render(),
                typeMov: "Top",
                is_movie: true,
            });
        }
        if (!this.data.compilationName) {
            return carouselTemplate({
                ...common,
                items: Series.render(),
                typeMov: "",
                is_movie: false,
            });
        }

        return carouselTemplate({
            ...common,
            items: unTop.render(),
            typeMov: "",
            is_movie: true,
        });
    }

    setHandler(): void {
        const wrap = document.querySelector(`.js-carousel${this.data.id}`);

        const buttonCarouselPrev = document.querySelector(
            `.js-carousel${this.data.id}__prev`
        );
        const buttonCarouselNext = document.querySelector(
            `.js-carousel${this.data.id}__next`
        );

        wrap.addEventListener("mouseover", () => {
            buttonCarouselPrev.classList.add("b-carousel__prev-hover");
            buttonCarouselNext.classList.add("b-carousel__next-hover");
        });

        wrap.addEventListener("mouseout", () => {
            buttonCarouselPrev.classList.remove("b-carousel__prev-hover");
            buttonCarouselNext.classList.remove("b-carousel__next-hover");
        });

        const a = new movingCarousel({
            main: `.js-carousel${this.data.id}`,
            wrap: `.js-carousel${this.data.id}__wrap`,
            prev: `.js-carousel${this.data.id}__prev`,
            next: `.js-carousel${this.data.id}__next`,
        });
    }
}