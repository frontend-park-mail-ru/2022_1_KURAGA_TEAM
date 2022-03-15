import carouselTemplate from './carousel.pug';
import movingCarousel from './movingCarousel.js';

export default class carousel {
    constructor(type, movies, num) {
        this.type = type;
        this.movies = movies;
        this.num = num;
    }

    render() {
        if (this.type === 'Pop') return carouselTemplate({items: this.movies,
            car: 'js-carouselPop',
            prevBtn: 'js-carouselPop__prev',
            nextBtn: 'js-carouselPop__next',
            wrapMov: 'js-carouselPop__wrap',
            typeMov: '',
            num: this.num});
        if (this.type === 'Top') return carouselTemplate({items: this.movies,
            car: 'js-carouselTop',
            prevBtn: 'js-carouselTop__prev',
            nextBtn: 'js-carouselTop__next',
            wrapMov: 'js-carouselTop__wrap',
            typeMov: 'top',
            num: this.num});
        if (this.type === 'Fam') return carouselTemplate({items: this.movies,
            car: 'js-carouselFam',
            prevBtn: 'js-carouselFam__prev',
            nextBtn: 'js-carouselFam__next',
            wrapMov: 'js-carouselFam__wrap',
            typeMov: '',
            num: this.num});
    }

    setHandler() {
        const a = new movingCarousel({
            main: `.js-carousel${this.type}`,
            wrap: `.js-carousel${this.type}__wrap`,
            prev: `.js-carousel${this.type}__prev`,
            next: `.js-carousel${this.type}__next`,
        });
    }
}
