import template from "./carousel.js";

export class CarouselClass {
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