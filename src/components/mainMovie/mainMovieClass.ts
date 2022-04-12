import mainMovieTemplate from './mainMovie.pug';

export default class MainMovieClass {
    private readonly info: object;

    constructor(info) {
        this.info = info
    }

    render() {
        return mainMovieTemplate({
            info: this.info
        });
    }
}
