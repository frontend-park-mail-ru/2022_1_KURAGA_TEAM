import errorViewTemplate from "./error.pug";
import HeaderClass from "Components/header/headerClass";
import UserModel from "../../../models/User";
import router from "Routing/router";
import FooterClass from "Components/footer/footerClass";
import { routes } from "Routing/constRouting";
import BaseViewClass from "../../baseView/baseViewClass";
import { User } from "../../../types";

import "./error.scss";

export default class ErrorViewClass extends BaseViewClass {
    private user: UserModel;

    async render() {
        try {

            const {user} = await UserModel.auth();
            if (!user) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            this.user = new UserModel(user);

            const header = new HeaderClass(this.user.userData);
            const footer = new FooterClass();

            super.render(errorViewTemplate, {
                header: header.render(),
                footer: footer.render(),
            });
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }
    unmount(){}
}
