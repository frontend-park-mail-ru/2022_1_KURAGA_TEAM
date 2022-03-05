import mainMovieTemplate from "./mainMovie.js";

export class MainMovieClass {
    render() {


        // const footerIcons = Object.entries(configIcon).map(([key, {href, src}]) => ({key, href, src}));

        return mainMovieTemplate();
    }
}