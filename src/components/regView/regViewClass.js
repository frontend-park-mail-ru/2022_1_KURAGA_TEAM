import regViewTemplate from "./regView.js";
import {FooterClass} from "../footer/footerClass.js";
import {InputsClass} from "../inputs/inputsClass.js";
import buttonTemplate from "../button/button.js";

const root = document.getElementById("root");

export class RegViewClass {
    render() {
        const footer = new FooterClass();
        const inputs = new InputsClass();

        root.innerHTML = regViewTemplate({
            inputs: inputs.render(),
            button: buttonTemplate(),
            footer: footer.render()});

        inputs.setHandler();
    }
}
