import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import carouselTemplate from "Components/carousel/carousel.pug";
import movingCarousel from "Components/carousel/movingCarousel";
import {MovieCompilationData} from "../../types";
import MovieClass from "Components/movie/movieClass";
import MovieCompilationModel from "./movieCompilationView"

export default class MovieCompilationView {


    static render(data: MovieCompilationData) {
        const idSeries = Math.floor(Math.random() * (-100));
        const Series = new MovieClass(data.movies, "Series", false, data.id, data.idSerial, idSeries);
        const Top = new MovieClass(data.movies, "Top", true);
        const unTop = new MovieClass(data.movies, "", true);
        // non unique ids
        const common = {
            car: `js-carousel${data.id}`,
            prevBtn: `js-carousel${data.id}__prev`,
            nextBtn: `js-carousel${data.id}__next`,
            wrapMov: `js-carousel${data.id}__wrap`,
            compilationName: data.compilationName,
        };


        if (data.compilationName === "Лучшее за 2011 год") {
            return carouselTemplate({
                ...common,
                items: Top.render(),
                typeMov: "Top",
                is_movie: true,
            });
        }
        if (!data.compilationName) {
            return carouselTemplate({
                car: `js-carousel${idSeries}`,
                prevBtn: `js-carousel${idSeries}__prev`,
                nextBtn: `js-carousel${idSeries}__next`,
                wrapMov: `js-carousel${idSeries}__wrap`,
                //compilationName: data.compilationName,
                items: Series.render(),
                typeMov: "Series",
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

    static setHandler(data: MovieCompilationData): void {
        let wrap: HTMLElement;
        let buttonCarouselNext: HTMLElement;
        let buttonCarouselPrev: HTMLElement;
        if (data.idSerial) {
            wrap = document.querySelector(`.b-carouselSeries`);

            buttonCarouselPrev = document.querySelector(
                `.b-carouselSeries__prev`
            );
            buttonCarouselNext = document.querySelector(
                `.b-carouselSeries__next`
            );
            const a = new movingCarousel({
                main: `.b-carouselSeries`,
                wrap: `.b-carouselSeries__wrap`,
                prev: `.b-carouselSeries__prev`,
                next: `.b-carouselSeries__next`,
            });
        } else {
            wrap = document.querySelector(`.js-carousel${data.id}`);

            buttonCarouselPrev = document.querySelector(
                `.js-carousel${data.id}__prev`
            );
            buttonCarouselNext = document.querySelector(
                `.js-carousel${data.id}__next`
            );
            const a = new movingCarousel({
                main: `.js-carousel${data.id}`,
                wrap: `.js-carousel${data.id}__wrap`,
                prev: `.js-carousel${data.id}__prev`,
                next: `.js-carousel${data.id}__next`,
            });
        }
        wrap.addEventListener("mouseover", (e) => {
            buttonCarouselPrev.classList.add("b-carousel__prev-hover");
            buttonCarouselNext.classList.add("b-carousel__next-hover");

        });
        wrap.addEventListener("mouseout", () => {
            buttonCarouselPrev.classList.remove("b-carousel__prev-hover");
            buttonCarouselNext.classList.remove("b-carousel__next-hover");
        });



    }

    static unmount(data: MovieCompilationData): void {

        let wrap: HTMLElement;
        let buttonCarouselNext: HTMLElement;
        let buttonCarouselPrev: HTMLElement;
        if (data.idSerial) {
            wrap = document.querySelector(`.b-carouselSeries`);

            buttonCarouselPrev = document.querySelector(
                `.b-carouselSeries__prev`
            );
            buttonCarouselNext = document.querySelector(
                `.b-carouselSeries__next`
            );
        } else {
            wrap = document.querySelector(`.js-carousel${data.id}`);

            buttonCarouselPrev = document.querySelector(
                `.js-carousel${data.id}__prev`
            );
            buttonCarouselNext = document.querySelector(
                `.js-carousel${data.id}__next`
            );
        }

        wrap.removeEventListener("mouseover", () => {
            buttonCarouselPrev.classList.add(`b-carousel__prev-hover`);
            buttonCarouselNext.classList.add("b-carousel__next-hover");
        });
        wrap.removeEventListener("mouseout", () => {
            buttonCarouselPrev.classList.remove("b-carousel__prev-hover");
            buttonCarouselNext.classList.remove("b-carousel__next-hover");
        });
    }
}