import subViewTemplate from "./sub.pug";
import HeaderClass from "Components/header/headerClass";
import FooterClass from "Components/footer/footerClass.ts";
import handlerLink from "Utils/handlerLink.ts";
import ButtonClass from "Components/button/buttonClass";
import UserModel from "../../models/User";
import router from "Routing/router";
import { routes } from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import { User } from "../../types";

import "./sub.scss";

export default class SubViewClass extends BaseViewClass {
    private user: UserModel;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const {user} = await UserModel.auth();
            if (!user) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            this.user = new UserModel(user);

            const userDate = new Date(this.user.data.date);
            const nowDate = new Date();

            const checkSub: boolean = nowDate > userDate;

            const header = new HeaderClass(this.user.userData);
            const button = new ButtonClass("Оформить подписку");
            const footer = new FooterClass();

            super.render(subViewTemplate, {
                checkSub,
                date: userDate.toLocaleDateString(),
                header: header.render(),
                button: button.render(),
                footer: footer.render(),
            });

            handlerLink();
            header.setHandler();
            this.setHandler();
        } catch(err) {
            console.error(err);
            //router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(): void {
        const subBtn = document.querySelector('.menu-button');

        subBtn.addEventListener('click', this.subscription);
    }

    async subscription() {
        const error: HTMLDivElement = document.querySelector('.error');

        const dataPay = UserModel.getPayToken();

        const payToken = await dataPay;

        const dataCsrf = UserModel.getToken();

        const csrfToken = await dataCsrf;

        const {isAuth} = await UserModel.pay(csrfToken, payToken);

        if (!isAuth) {
            error.classList.add('error-active');
        }

        const sub = UserModel.subscription(payToken);
    }

    unmount(): void {
        const subBtn = document.querySelector('.menu-button');

        if (subBtn !== null) {
            subBtn.removeEventListener('click', this.subscription);
        }
    }
}
