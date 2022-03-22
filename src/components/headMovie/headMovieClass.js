import headMovieTemplate from './headMovie.pug'

export default class HeadMovieClass {
    #info;

    constructor(info) {
        this.#info = info
    }

    render() {
        return headMovieTemplate({
           info: this.#info
        });
    }
}