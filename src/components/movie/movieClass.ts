import movieTemplate from "./movie.pug";
import { MovieData } from "../../types";
export default class movieClass {
    private readonly info: MovieData;

    constructor(info: MovieData) {
        this.info = info;

    }

    render(typeMov : string) {
        return movieTemplate({
            item: this.info,
            typeMov: typeMov,
        });
    }
}
