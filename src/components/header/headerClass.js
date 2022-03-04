import headerTemplate from "./header.js";

//import {MainMovieClass} from "../mainMovie/mainMovieClass";
export class HeaderClass {
    render() {
        

        // const footerIcons = Object.entries(configIcon).map(([key, {href, src}]) => ({key, href, src}));

        return headerTemplate();
    }
}