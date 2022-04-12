import secondGenreTemplate from './secondGenre.pug'

interface Genres {
    genre: object,
}

export default class SecondGenreClass {
    private readonly genres: object;

    constructor(genres: Genres) {
        this.genres = genres.genre;
    }

    render() {
        return secondGenreTemplate({genres: this.genres})
    }
}