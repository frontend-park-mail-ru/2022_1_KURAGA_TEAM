import { ajaxReq } from "Modules/ajax";
import router from "Routing/router.ts";
import { routes } from "Routing/constRouting";
import carouselTemplate from "Components/carousel/carousel.pug";
import movingCarousel from "Components/carousel/movingCarousel";
import { MovieCompilationData } from "../types";

export default class MovieCompilationModel {
    data: MovieCompilationData;

    constructor(index, movieCompilationData, isMobile) {
        this.data = {
            id: index,
            compilationName: movieCompilationData.compilation_name,
            movies: movieCompilationData.movies,
            isMobile: isMobile,
        };
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

    render() {
        const common = {
            items: this.data.movies,
            car: `js-carousel${this.data.id}`,
            prevBtn: `js-carousel${this.data.id}__prev`,
            nextBtn: `js-carousel${this.data.id}__next`,
            wrapMov: `js-carousel${this.data.id}__wrap`,
            compilationName: this.data.compilationName,
        };




        if (
            this.data.compilationName === "Лучшее за 2011 год" &&
            this.data.isMobile === true
        ) {
            return carouselTemplate({
                ...common,
                typeMov: "Top",
                num: 1,
                countDiv: Math.ceil(this.data.movies.length / 1)
            });
        }
        if (this.data.isMobile === true) {
            return carouselTemplate({
                ...common,
                typeMov: "",
                num: 2,
                countDiv: Math.ceil(this.data.movies.length / 2),
            });
        }
        if (this.data.compilationName === "Лучшее за 2011 год") {
            return carouselTemplate({
                ...common,
                typeMov: "Top",
                num: 3,
                countDiv: Math.ceil(this.data.movies.length / 3),
            });
        }

        return carouselTemplate({
            ...common,
            typeMov: "",
            countDiv: Math.ceil(this.data.movies.length / 4),
            num: 4,
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
