import loginViewTemplate from "./loginView.js";
import {FooterClass} from "../../components/footer/footerClass.js";
import {InputsClass} from "../../components/inputs/inputsLogin/inputsClass.js";
import router from "../../routing/router.js";

const root = document.getElementById("root");
root.classList.remove("root");

export class LoginViewClass {
    render() {
        const footer = new FooterClass();
        const inputs = new InputsClass();

        root.innerHTML = loginViewTemplate({
            inputs: inputs.render(),
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
