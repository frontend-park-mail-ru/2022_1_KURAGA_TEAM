import headerTemplate from "./header.js";

const configUser= {
    name: "admin",
    src: ""
};

export class HeaderClass {
    render() {

        return headerTemplate(configUser);
    }
}