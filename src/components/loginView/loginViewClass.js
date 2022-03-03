import loginViewTemplate from "./loginView.js";
import {FooterClass} from "../footer/footerClass.js";
import {InputsClass} from "../inputsLogin/inputsClass.js";

const root = document.getElementById("root");

export class LoginViewClass {
    render() {
        const footer = new FooterClass();
        const inputs = new InputsClass();

        root.innerHTML = loginViewTemplate({
            inputs: inputs.render(),
            footer: footer.render()});

        inputs.setHandler();
    }
}
