import movieTemplate from "./movie.pug";
import {MovieData} from "../../types";

export default class MovieClass {
    private readonly movies: Array<MovieData>;
    private readonly typeMov: string;

    constructor(info: Array<MovieData>, typeMov?: string) {
        this.movies = info;
        this.typeMov = typeMov;
    }

    render() {
        const genreConfig = [{id: 0, name: ""}];
        this.movies.forEach((value, index) => {
            if (value.genre === null) {
                value.genre = genreConfig;
            }
        })

        return movieTemplate({
            items: this.movies,
            typeMov: this.typeMov
        });
    }
}
