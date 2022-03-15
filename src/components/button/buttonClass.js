import buttonTemplate from './button.pug';

export default class ButtonClass {
    #value;

    #cls;

    constructor(value, cls = '') {
        this.#value = value;
        this.#cls = cls;
    }

    render() {
        return buttonTemplate({value: this.#value, cls: this.#cls});
    }
}
