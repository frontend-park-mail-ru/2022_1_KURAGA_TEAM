import headerTemplate from "./header.js";

//import {MainMovieClass} from "../mainMovie/mainMovieClass";
export class HeaderClass {
    render() {

        const configUser= {
                name: "admin",
                src: ""
        };
        
        return headerTemplate(configUser);
    }
}