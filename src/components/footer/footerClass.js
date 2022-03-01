import template from "./footer.js";

export class FooterClass {
    #items;
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    set items(value) {
        this.#items = value;
    }

    render() {
        this.#parent.innerHTML += template(this.#items);
    }
}