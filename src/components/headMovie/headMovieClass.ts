import headMovieTemplate from './headMovie.pug'

export default class HeadMovieClass {
    private readonly info: object;

    constructor(info: object) {
        this.info = info
    }

    render() {
        return headMovieTemplate({
           info: this.info
        });
    }
}