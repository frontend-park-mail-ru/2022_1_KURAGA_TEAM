import headMovieTemplate from './headMovie.pug'

export default class HeadMovieClass {
    #info;

    constructor({year, genre, country, duration, age, rating, poiskRating}) {
        this.#info = {
            year,
            genre,
            country,
            duration,
            age,
            rating,
            poiskRating
        };
    }

    render() {
        return headMovieTemplate({
           info: this.#info
        });
    }
}