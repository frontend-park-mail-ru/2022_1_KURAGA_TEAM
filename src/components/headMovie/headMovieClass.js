import headMovieTemplate from './headMovie.pug'

export default class HeadMovieClass {
    #info;

    constructor({year, genre, country, duration, age, rating, kinopoisk_rating}) {
        this.#info = {
            year,
            genre,
            country,
            duration,
            age,
            rating,
            kinopoisk_rating
        };
    }

    render() {
        return headMovieTemplate({
           info: this.#info
        });
    }
}