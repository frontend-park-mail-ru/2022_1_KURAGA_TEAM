import carouselFamTemplate from "./carouselFam.js";
import {Carousel} from "../Carousel.js"

const famMovies = [
    {
        href: "/",
        name: "Звездные войны5",
        genre: "Фантастика"
    },
    {
        href: "/",
        name: "Звездные войны6",
        genre: "Фантастика"
    },
    {
        href: "/",
        name: "Звездные войны7",
        genre: "Фантастика"
    },
    {
        href: "/",
        name: "Звездные войны8",
        genre: "Фантастика"
    }
];

export class CarouselFamClass {
    render() {
        return carouselFamTemplate(famMovies);
    }

    setHandler() {

        let a = new Carousel({
            "main": ".js-carouselFam",
            "wrap": ".js-carouselFam__wrap",
            "prev": ".js-carouselFam__prev",
            "next": ".js-carouselFam__next"
        });
    }
}