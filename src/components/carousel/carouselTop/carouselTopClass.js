import carouselTopTemplate from "./carouselTop.js";
import {Carousel} from "../Carousel.js"

const topMovies = [
    {
        href: "/",
        name: "Звездные войны1",
        genre: "Фантастика1"
    },
    {
        href: "/",
        name: "Звездные войны2",
        genre: "Фантастика2"
    },
    {
        href: "/",
        name: "Звездные войны3",
        genre: "Фантастика3"
    }
];

export class CarouselTopClass {
    render() {
        return carouselTopTemplate(topMovies);
    }

    setHandler() {

        let a = new Carousel({
            "main": ".js-carouselTop",
            "wrap": ".js-carouselTop__wrap",
            "prev": ".js-carouselTop__prev",
            "next": ".js-carouselTop__next"
        });


    }
}