import carouselTemplate from './carousel.pug';
import movingCarousel from './movingCarousel.js';

export default class Carousel {
    constructor(type, compilation) {
        this.type = type;
        this.movies = compilation.movies;
        this.title = compilation.compilation_name;
    }

    render() {
        if (this.type === "MobilePop") return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselMobilePop',
            prevBtn: 'js-carouselMobilePop__prev',
            nextBtn: 'js-carouselMobilePop__next',
            wrapMov: 'js-carouselMobilePop__wrap',
            typeMov: '',
            countDiv: Math.ceil(this.movies.length / 2),
            num: 2,
            title: this.title
        });

        if (this.type === "MobileTop") return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselMobileTop',
            prevBtn: 'js-carouselMobileTop__prev',
            nextBtn: 'js-carouselMobileTop__next',
            wrapMov: 'js-carouselMobileTop__wrap',
            typeMov: 'Top',
            countDiv: Math.ceil(this.movies.length / 1),
            num: 1,
            title: this.title
        });
        if (this.type === "MobileFam") return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselMobileFam',
            prevBtn: 'js-carouselMobileFam__prev',
            nextBtn: 'js-carouselMobileFam__next',
            wrapMov: 'js-carouselMobileFam__wrap',
            typeMov: '',
            countDiv: Math.ceil(this.movies.length / 2),
            num: 2,
            title: this.title
        });

        if (this.type === "Pop") return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselPop',
            prevBtn: 'js-carouselPop__prev',
            nextBtn: 'js-carouselPop__next',
            wrapMov: 'js-carouselPop__wrap',
            typeMov: '',
            countDiv: Math.ceil(this.movies.length / 4),
            num: 4,
            title: this.title
        });
        if (this.type === "Top") return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselTop',
            prevBtn: 'js-carouselTop__prev',
            nextBtn: 'js-carouselTop__next',
            wrapMov: 'js-carouselTop__wrap',
            typeMov: 'Top',
            countDiv: Math.ceil(this.movies.length / 3),
            num: 3,
            title: this.title
        });
        if (this.type === "Fam") return carouselTemplate({
            type: this.type,
            items: this.movies,
            car: 'js-carouselFam',
            prevBtn: 'js-carouselFam__prev',
            nextBtn: 'js-carouselFam__next',
            wrapMov: 'js-carouselFam__wrap',
            typeMov: '',
            countDiv: Math.ceil(this.movies.length / 4),
            num: 4,
            title: this.title
        });
    }

    setHandler() {
        for (let i = 0; i < 3; i++) {
            const wrap = document.querySelector(`.js-carousel${this.type}`);

            const buttonCaruselPrev = document.querySelector(`.js-carousel${this.type}__prev`);
            const buttonCaruselNext = document.querySelector(`.js-carousel${this.type}__next`);

            wrap.addEventListener('mouseover', () => {
                buttonCaruselPrev.classList.add('b-carousel__prev-hover');
                buttonCaruselNext.classList.add('b-carousel__next-hover');
            });

            wrap.addEventListener('mouseout', () => {
                buttonCaruselPrev.classList.remove('b-carousel__prev-hover');
                buttonCaruselNext.classList.remove('b-carousel__next-hover');
            });
        }

        const a = new movingCarousel({
            main: `.js-carousel${this.type}`,
            wrap: `.js-carousel${this.type}__wrap`,
            prev: `.js-carousel${this.type}__prev`,
            next: `.js-carousel${this.type}__next`,
        });
    }
}
