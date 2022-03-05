import loginViewTemplate from "./loginView.js";
import {FooterClass} from "../../components/footer/footerClass.js";
import {InputsClass} from "../../components/inputsLogin/inputsClass.js";

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
