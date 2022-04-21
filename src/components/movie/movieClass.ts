import movieTemplate from "./movie.pug";
import {MovieData} from "../../types";

export default class MovieClass {
    private readonly info: MovieData;

    constructor(info: MovieData) {
        this.info = info;

    }

    render(typeMov?: string) {
        return movieTemplate({
            info: this.info,
            typeMov: typeMov
        });
    }
}
