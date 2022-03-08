import buttonTemplate from './button.js';

export class ButtonClass {
    #value;
    #cls;

    constructor(value, cls = "") {
        this.#value = value;
        this.#cls = cls;
    }
    render() {
        return buttonTemplate(this.#value, this.#cls);
    }
}
