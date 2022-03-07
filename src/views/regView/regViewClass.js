import regViewTemplate from "./regView.js";
import {FooterClass} from "../../components/footer/footerClass.js";
import {InputsClass} from "../../components/inputs/inputsReg/inputsClass.js";
import {ButtonClass} from "../../components/button/buttonClass.js";
import {setHandler} from "../../utils/handlerLink.js";

const root = document.getElementById("root");

export class RegViewClass {
    render() {
        const footer = new FooterClass();
        const inputs = new InputsClass();
        const button = new ButtonClass();

        root.innerHTML = regViewTemplate({
            inputs: inputs.render(),
            button: button.render("Зарегистрироваться", ""),
            footer: footer.render()});

        inputs.setHandler();
        setHandler();
    }
}
