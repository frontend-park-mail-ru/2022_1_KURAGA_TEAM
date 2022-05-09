import FooterClass from "Components/footer/footerClass.ts";
import InputsClass from "Components/inputs/inputsLogin/inputsClass";
import ButtonClass from "Components/button/buttonClass.ts";
import handlerLink from "Utils/handlerLink";
import router from "Routing/router.ts";
import { routes } from "Routing/constRouting";
import loginViewTemplate from "./loginView.pug";
import BaseViewClass from "../baseView/baseViewClass";
import UserModel from "../../models/User";

import "../regView/regLog.scss";

export default class LoginViewClass extends BaseViewClass {
    private inputs: any;

    constructor() {
        super();
        this.inputs = new InputsClass();
    }

    async render() {
        try {
            const {user} = await UserModel.auth();
            if (user) {
                router.go(routes.HOME_VIEW);
                return;
            }

            const footer = new FooterClass();

            const button = new ButtonClass("Войти");

            super.render(loginViewTemplate, {
                inputs: this.inputs.render(),
                button: button.render(),
                footer: footer.render(),
            });

            this.inputs.setHandler();
            handlerLink();
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    unmount() {
        this.inputs.unmount();
    }
}
