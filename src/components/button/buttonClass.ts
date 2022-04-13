import buttonTemplate from "./button.pug";

export default class ButtonClass {
    private readonly value: string;

    private readonly cls: string;

    constructor(value: string, cls = "") {
        this.value = value;
        this.cls = cls;
    }

    render() {
        return buttonTemplate({ value: this.value, cls: this.cls });
    }
}
