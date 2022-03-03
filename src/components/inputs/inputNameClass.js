import inputsTemplate from "./inputs.js";

export class InputNameClass {
    #items;
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    set items(value) {
        this.#items = value;
    }

    render() {
        this.#parent.innerHTML += inputsTemplate(this.#items);
    }
}