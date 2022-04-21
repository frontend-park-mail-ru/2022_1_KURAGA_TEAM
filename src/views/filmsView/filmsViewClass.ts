import filmsViewTemplate from "./filmsView.pug";
import HeaderClass from "Components/header/headerClass";
import UserModel from "../../models/User";
import handlerLink from "Utils/handlerLink";
import router from "Routing/router";
import FooterClass from "Components/footer/footerClass";
import { routes } from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import { User } from "../../types";
import ListFilmsClass from "../../components/listFilms/listFilmsClass";
import LoaderViewClass from "../loaderView/loaderViewClass";

import "./films.scss";

export default class FilmsViewClass extends BaseViewClass {
    private user: UserModel;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const { isAuth, userBody } = await UserModel.auth();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }

            const userData: User = await Promise.resolve(userBody);
            this.user = new UserModel(userData.user);

            const header = new HeaderClass(this.user.userData);
            const listFilms = new ListFilmsClass();
            const footer = new FooterClass();

            super.render(filmsViewTemplate, {
                header: header.render(),
                listFilms: listFilms.render(),
                footer: footer.render(),
            });

            this.setHandler();
            handlerLink();
            header.setHandler();
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(): void {
        const filmsNavbar: HTMLAnchorElement =
            document.querySelector(".font-nav.movie-js");

        filmsNavbar.style.backgroundColor = "#2C51B1";
        filmsNavbar.style.webkitBackgroundClip = "text";
        filmsNavbar.style.webkitTextFillColor = "transparent";
        filmsNavbar.style.backgroundImage =
            "linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)";
    }
}
