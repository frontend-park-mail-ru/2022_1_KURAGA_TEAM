import headerTemplate from "./header.js";

//import {MainMovieClass} from "../mainMovie/mainMovieClass";
export class HeaderClass {
    render() {

        const configProfile = {
            admin: {
                name: "admin",
                src: ""
            }
        };


        const profile = Object.entries(configProfile).map(([key, {name, src}]) => ({key, name, src}));

        return headerTemplate(profile);
    }
}