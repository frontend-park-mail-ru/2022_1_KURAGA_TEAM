import serialsViewTemplate from "./serialsView.pug";
import HeaderClass from "Components/header/headerClass";
import UserModel from "../../models/User";
import router from "Routing/router";
import FooterClass from "Components/footer/footerClass";
import { routes } from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import { User } from "../../types";
import handlerLink from "Utils/handlerLink";
import ListFilmsClass from "../../components/listFilms/listFilmsClass";
import MovieCompilationModel from "../../models/MovieCompilation";
import LoaderViewClass from "../loaderView/loaderViewClass";
import UserLikeView from "../userLikeView/userLikeView"
import AutoBind from "Utils/autoBind"
import "../filmsView/films.scss";

export default class SerialsViewClass extends BaseViewClass {
    private user: UserModel;
    private movieCompilation: MovieCompilationModel;

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

            const { movCompBody } = await MovieCompilationModel.getSeries();
            this.movieCompilation = new MovieCompilationModel(0, movCompBody);



            const header = new HeaderClass(this.user.userData);
            const listFilms = new ListFilmsClass(this.movieCompilation);

            super.render(serialsViewTemplate, {
                header: header.render(),
                listFilms: listFilms.render(),

            });

            this.setHandler();
            handlerLink();
            const autoBind = new AutoBind(".all-list");
            autoBind.setVariableStyle("flexContentList","space-between");
            const {likesData} = await UserModel.getLikes()
            ListFilmsClass.setHandler();
            UserLikeView.setAllLikes(likesData.favorites.id);
            UserLikeView.setHandler();
            header.setHandler();
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(): void {
        const serialsNavbar: HTMLAnchorElement = document.querySelector(".font-nav.serials-js");
        const serialsMobileNavbar: HTMLAnchorElement = document.querySelector(".menu-mobile__nav.serials-js");

        serialsNavbar.classList.add("headline-style");
        serialsMobileNavbar.classList.add("headline-style");
    }
    unmount(){

    }
}
