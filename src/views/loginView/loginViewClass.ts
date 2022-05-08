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


    async render() {
        try {

            const {user} = await UserModel.auth();
            if (user) {
                router.go(routes.HOME_VIEW);
                return;
            }

            const footer = new FooterClass();
            const inputs = new InputsClass();
            const button = new ButtonClass("Войти");

            super.render(loginViewTemplate, {
                inputs: inputs.render(),
                button: button.render(),
                footer: footer.render(),
            });

            inputs.setHandler();
            handlerLink();
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }
    unmount(){
        // removeEvent inputs
    }
}
