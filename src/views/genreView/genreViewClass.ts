import genreViewTemplate from "./genreView.pug";
import HeaderClass from "Components/header/headerClass";
import UserModel from "../../models/User";
import router from "Routing/router";
import FooterClass from "Components/footer/footerClass";
import { routes } from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import { User } from "../../types";
import handlerLink from "Utils/handlerLink";
import ListFilmsClass from "../../components/listFilms/listFilmsClass";
import LoaderViewClass from "../loaderView/loaderViewClass";

import "../filmsView/films.scss";

export default class GenreViewClass extends BaseViewClass {
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

            super.render(genreViewTemplate, {
                header: header.render(),
                listFilms: listFilms.render(),
                footer: footer.render(),
            });

            handlerLink();
            header.setHandler();
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }
}
