import carouselTemplate from "./carousel.js";
import movingCarousel from "./movingCarousel.js"
const popMovies = [
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

const topMovies = [
    {
        href: "/",
        name: "Звездные войны#1",
        genre: "Фантастика"
    },
    {
        href: "/",
        name: "Звездные войны#2",
        genre: "Фантастика"
    },
    {
        href: "/",
        name: "Звездные войны#3",
        genre: "Фантастика"
    }
];

export class carousel {

    constructor(type) {
        this.type = type;
    }

    render() {
        if (this.type == "Pop")
            return carouselPopTemplate(popMovies,"js-carouselPop","js-carouselPop__prev","js-carouselPop__next","js-carouselPop__wrap","");
        if (this.type == "Top")
            return carouselPopTemplate(topMovies,"js-carouselTop","js-carouselTop__prev","js-carouselTop__next","js-carouselTop__wrap","top");
        if (this.type == "Fam")
            return carouselPopTemplate(popMovies,"js-carouselFam","js-carouselFam__prev","js-carouselFam__next","js-carouselFam__wrap","");
    }

    setHandler() {
        let a = new movingCarousel({
            "main": ".js-carousel" + this.type,
            "wrap": ".js-carousel" + this.type + "__wrap",
            "prev": ".js-carousel" + this.type + "__prev",
            "next": ".js-carousel" + this.type + "__next"
        });
    }
}