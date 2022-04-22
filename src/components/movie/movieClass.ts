import movieTemplate from "./movie.pug";
import {MovieData} from "../../types";

export default class MovieClass {
    private readonly movies: Array<MovieData>;
    private readonly typeMov: string;
    constructor(info:Array<MovieData>,typeMov?: string) {
        this.movies = info;
        this.typeMov =  typeMov;
    }

    render() {
        return movieTemplate({
            items: this.movies,
            typeMov: this.typeMov
        });
    }
}
