import carouselTemplate from './carousel.js';
import movingCarousel from './movingCarousel.js';



export default class carousel {
    constructor(type,movies,num) {
        this.type = type;
        this.movies = movies;
        this.num = num;
    }

    render() {
        console.log(this.movies)
        if (this.type === 'Pop') return carouselTemplate(this.movies, 'js-carouselPop', 'js-carouselPop__prev', 'js-carouselPop__next', 'js-carouselPop__wrap', '',this.num);
        if (this.type === 'Top') return carouselTemplate(this.movies, 'js-carouselTop', 'js-carouselTop__prev', 'js-carouselTop__next', 'js-carouselTop__wrap', 'top',this.num);
        if (this.type === 'Fam') return carouselTemplate(this.movies, 'js-carouselFam', 'js-carouselFam__prev', 'js-carouselFam__next', 'js-carouselFam__wrap', '',this.num);
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
