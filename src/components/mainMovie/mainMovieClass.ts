import mainMovieTemplate from './mainMovie.pug';
import { mainMovieData } from "../../types";
export default class MainMovieClass {
    private readonly info: mainMovieData;

    constructor(info: mainMovieData) {
        this.info = info
    }

    render() {
        return mainMovieTemplate({
            info: this.info
        });
    }
}
