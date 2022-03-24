import mainMovieTemplate from './mainMovie.pug';

export default class MainMovieClass {
    #info;

    constructor(info) {
        this.#info = info
    }

    render() {
        return mainMovieTemplate({
            info: this.#info
        });
    }
}
