import movieTemplate from "./movie.pug";
import {MovieData} from "../../types";

export default class MovieClass {
    private readonly movies: Array<MovieData>;
    private readonly typeMov: string;
    private readonly is_movie: boolean;

    constructor(info: Array<MovieData>, typeMov?: string, is_movie?: boolean) {
        this.movies = info;
        this.typeMov = typeMov;
        this.is_movie = is_movie;
    }

    render() {

        const genreConfig = [{id: 0, name: ""}];

        this.movies.forEach((value, index) => {
            if (value.genre === null) {
                value.genre = genreConfig;
            }
        })
        console.log(this.movies);

        return movieTemplate({
            items: this.movies,
            typeMov: this.typeMov,
            is_movie: this.is_movie,
        });
    }
}
