import movieTemplate from "./movie.pug";
import {MovieData} from "../../types";
import "./movie.scss";

export default class MovieClass {
    private readonly movies: Array<MovieData>;
    private readonly typeMov: string;
    private readonly is_movie: boolean;
    private readonly idx: number;
    private readonly season: number;
    private readonly check: boolean;

    constructor(info: Array<MovieData>, typeMov?: string, is_movie?: boolean, season?: number, idx?: number,idSerial?:number, check?: boolean) {
        this.movies = info;
        this.typeMov = typeMov;
        this.is_movie = is_movie;
        this.season = season;
        this.idx = idx;
        this.check = check;
    }

    render() {
        const genreConfig = [{id: 0, name: ""}];

        this.movies.forEach((value) => {
            if (value.genre === null) {
                value.genre = genreConfig;
            }
        })
        return movieTemplate({
            season: this.season,
            check: this.check,
            idx: this.idx,
            items: this.movies,
            typeMov: this.typeMov,
            is_movie: this.is_movie,
        });
    }

}
