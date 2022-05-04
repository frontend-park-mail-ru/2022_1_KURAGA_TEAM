import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import carouselTemplate from "Components/carousel/carousel.pug";
import movingCarousel from "Components/carousel/movingCarousel";
import {MovieCompilationData} from "../../types";
import MovieClass from "Components/movie/movieClass";
import MovieCompilationModel from "./movieCompilationView"

export default class MovieCompilationView {


    static render(data:MovieCompilationData) {
        const Series = new MovieClass(data.movies, "", false, data.id, data.idSerial);
        const Top = new MovieClass(data.movies, "Top", true);
        const unTop = new MovieClass(data.movies, "", true);

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

    static setHandler(data:MovieCompilationData): void {
        const wrap = document.querySelector(`.js-carousel${data.id}__wrap`);

        const buttonCarouselPrev = document.querySelector(
            `.js-carousel${data.id}__prev`
        );
        const buttonCarouselNext = document.querySelector(
            `.js-carousel${data.id}__next`
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
            main: `.js-carousel${data.id}`,
            wrap: `.js-carousel${data.id}__wrap`,
            prev: `.js-carousel${data.id}__prev`,
            next: `.js-carousel${data.id}__next`,
        });
    }
}