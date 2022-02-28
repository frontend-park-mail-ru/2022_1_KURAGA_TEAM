import pug from "../../node_modules/pug/lib/index.js";

export class Footer {
    #items
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    set items(value) {
        this.#items = value;
    }

    render() {
        this.#parent.innerHTML += pug.renderFile("footer", this.#items);
    }
}