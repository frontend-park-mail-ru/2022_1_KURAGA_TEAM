import carouselPopTemplate from "./carouselPop.js";
import {Carousel} from "../Carousel.js"
//import {MainMovieClass} from "../mainMovie/mainMovieClass";
export class CarouselPopClass {
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

        return carouselPopTemplate(Movies);
    }

    setHandler() {
        let a = new Carousel({
            "main": ".js-carouselPop",
            "wrap": ".js-carouselPop__wrap",
            "prev": ".js-carouselPop__prev",
            "next": ".js-carouselPop__next"
        });
    }
}