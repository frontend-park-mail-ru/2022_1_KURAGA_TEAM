import template from "./mainMovie.js";

export class MainMovieClass {
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