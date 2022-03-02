import template from "./header.js";

export class HeaderClass {
    #items;
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    set item(value) {
        this.#items = value;
    }

    render() {
        this.#parent.innerHTML += template(this.#items);
    }
}