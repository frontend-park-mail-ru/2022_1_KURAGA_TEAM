import regViewTemplate from "./regView.js";
import {FooterClass} from "../../components/footer/footerClass.js";
import {InputsClass} from "../../components/inputs/inputsReg/inputsClass.js";
import buttonTemplate from "../../components/button/button.js";
import router from "../../routing/router.js";

const root = document.getElementById("root");
root.classList.remove("root");

export class RegViewClass {
    render() {
        const footer = new FooterClass();
        const inputs = new InputsClass();

        root.innerHTML = regViewTemplate({
            inputs: inputs.render(),
            button: buttonTemplate(),
            footer: footer.render()});

        inputs.setHandler();
        this.setHandler();
    }

    setHandler() {
        Array.from(document.getElementsByTagName('a')).forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                router.go(item.pathname);
            })
        });
    }
}
