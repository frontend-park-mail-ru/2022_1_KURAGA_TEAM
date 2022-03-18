import headMovieTemplate from './headMovie.pug'

export default class HeadMovieClass {
    #year;
    #genre;
    #country
    #duration
    #age
    #rating
    #poiskRating

    constructor(...params) {
        this.#year = params[0];
        this.#genre = params[1];
        this.#country = params[2]
        this.#duration = params[3];
        this.#age = params[4];
        this.#rating = params[5];
        this.#poiskRating = params[6];
    }

    render() {
        return headMovieTemplate({
            year: this.#year,
            genre: this.#genre,
            country: this.#country,
            duration: this.#duration,
            age: this.#age,
            rating: this.#rating,
            poiskRating: this.#poiskRating
        });
    }
}