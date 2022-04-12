import secondGenreTemplate from './secondGenre.pug'

export default class SecondGenreClass {
    private readonly genres: Genre;

    constructor(genres: Genres) {
        this.genres = genres.genre;
    }

    render() {
        return secondGenreTemplate({genres: this.genres})
    }
}