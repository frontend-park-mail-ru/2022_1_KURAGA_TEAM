import secondGenreTemplate from './secondGenre.pug'

export default class SecondGenreClass {
    #genres

    constructor(genres) {
        this.#genres = genres;
    }

    render() {
        return secondGenreTemplate({genres: this.#genres})
    }
}