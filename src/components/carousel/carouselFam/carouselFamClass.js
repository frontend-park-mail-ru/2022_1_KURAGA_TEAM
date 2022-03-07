import carouselFamTemplate from "./carouselFam.js";
import {Carousel} from "../Carousel.js"
export class CarouselFamClass {
    render() {


        const Movies = [
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
            },
            {
                href: "/",
                name: "Звездные войны4",
                genre: "Фантастика4"
            }
        ];

        return carouselFamTemplate(Movies);
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