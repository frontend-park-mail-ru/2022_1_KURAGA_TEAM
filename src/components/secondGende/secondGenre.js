import secondGenreTemplate from './secondGenre.pug'

export default class SecondGenreClass {
    #genres

    constructor(genres) {
        this.#genres = genres.genre;
    }

    render() {
        return secondGenreTemplate({genres: this.#genres})
    }
}