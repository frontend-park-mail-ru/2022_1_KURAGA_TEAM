import FooterClass from "Components/footer/footerClass.ts";
import InputsClass from "Components/inputs/inputsReg/inputsClass.ts";
import ButtonClass from "Components/button/buttonClass.ts";
import handlerLink from "Utils/handlerLink.ts";
import router from "Routing/router.ts";
import { routes } from "Routing/constRouting";
import regViewTemplate from "./regView.pug";
import BaseViewClass from "../baseView/baseViewClass";
import UserModel from "../../models/User";

import "./regLog.scss";

export default class RegViewClass extends BaseViewClass {
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
            const button = new ButtonClass("Зарегистрироваться");

            super.render(regViewTemplate, {
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

    unmount(): void {
        this.inputs.unmount();
    }
}
