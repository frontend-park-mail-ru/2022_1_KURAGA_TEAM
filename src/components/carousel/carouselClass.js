import carouselTemplate from './carousel.pug';
import movingCarousel from './movingCarousel.js';

export default class Carousel {
    constructor(id, compilation, isMobile) {
        this.id = id;
        this.movies = compilation.movies;
        this.title = compilation.compilation_name;
        this.isMobile = isMobile;
    }

    render() {

        if (this.title === "Лучшее за 2011 год" && this.isMobile === true)
            return carouselTemplate({
                items: this.movies,
                car: `js-carousel${this.id}`,
                prevBtn: `js-carousel${this.id}__prev`,
                nextBtn: `js-carousel${this.id}__next`,
                wrapMov: `js-carousel${this.id}__wrap`,
                typeMov: 'Top',
                num: 1,
                countDiv: Math.ceil(this.movies.length / 1),
                title: this.title
            });
        if (this.isMobile === true)
            return carouselTemplate({
                items: this.movies,
                car: `js-carousel${this.id}`,
                prevBtn: `js-carousel${this.id}__prev`,
                nextBtn: `js-carousel${this.id}__next`,
                wrapMov: `js-carousel${this.id}__wrap`,
                typeMov: '',
                num: 2,
                countDiv: Math.ceil(this.movies.length / 2),
                title: this.title
            });
        if (this.title === "Лучшее за 2011 год")
            return carouselTemplate({
                items: this.movies,
                car: `js-carousel${this.id}`,
                prevBtn: `js-carousel${this.id}__prev`,
                nextBtn: `js-carousel${this.id}__next`,
                wrapMov: `js-carousel${this.id}__wrap`,
                typeMov: 'Top',
                num: 3,
                countDiv: Math.ceil(this.movies.length / 3),
                title: this.title
            });


        return carouselTemplate({
            items: this.movies,
            car: `js-carousel${this.id}`,
            prevBtn: `js-carousel${this.id}__prev`,
            nextBtn: `js-carousel${this.id}__next`,
            wrapMov: `js-carousel${this.id}__wrap`,
            typeMov: '',
            countDiv: Math.ceil(this.movies.length / 4),
            num: 4,
            title: this.title
        });

    }

    setHandler() {
        for (let i = 0; i < 4; i++) {
            const wrap = document.querySelector(`.js-carousel${this.id}`);

            const buttonCarouselPrev = document.querySelector(`.js-carousel${this.id}__prev`);
            const buttonCarouselNext = document.querySelector(`.js-carousel${this.id}__next`);

            wrap.addEventListener('mouseover', () => {
                buttonCarouselPrev.classList.add('b-carousel__prev-hover');
                buttonCarouselNext.classList.add('b-carousel__next-hover');
            });

            wrap.addEventListener('mouseout', () => {
                buttonCarouselPrev.classList.remove('b-carousel__prev-hover');
                buttonCarouselNext.classList.remove('b-carousel__next-hover');
            });
        }

        const a = new movingCarousel({
            main: `.js-carousel${this.id}`,
            wrap: `.js-carousel${this.id}__wrap`,
            prev: `.js-carousel${this.id}__prev`,
            next: `.js-carousel${this.id}__next`,
        });



    }
}
