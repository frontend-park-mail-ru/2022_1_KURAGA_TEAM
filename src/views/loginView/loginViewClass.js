import loginViewTemplate from "./loginView.js";
import {FooterClass} from "../../components/footer/footerClass.js";
import {InputsClass} from "../../components/inputs/inputsLogin/inputsClass.js";
import {ButtonClass} from "../../components/button/buttonClass.js";
import {setHandler} from "../../utils/handlerLink.js";

const root = document.getElementById("root");

export class LoginViewClass {
    render() {
        const footer = new FooterClass();
        const inputs = new InputsClass();
        const button = new ButtonClass();

        root.innerHTML = loginViewTemplate({
            inputs: inputs.render(),
            button: button.render("Войти", ""),
            footer: footer.render()});

        inputs.setHandler();
        setHandler();
    }
}
