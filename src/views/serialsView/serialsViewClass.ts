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
    private static has: boolean;
    private static currentOffset: number;

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

            SerialsViewClass.currentOffset = 0;
            const { movCompBody } = await MovieCompilationModel.getSeries(20, SerialsViewClass.currentOffset);
            this.movieCompilation = new MovieCompilationModel(0, movCompBody);

            const header = new HeaderClass(this.user.userData);
            const listFilms = new ListFilmsClass(this.movieCompilation);

            super.render(serialsViewTemplate, {
                header: header.render(),
                listFilms: listFilms.render(),

            });
            const autoBind = new AutoBind(".all-list");
            autoBind.setVariableStyle("flexContentList","space-between");
            this.setHandler();
            handlerLink();

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

        window.addEventListener('scroll', this.scrollAdd);
    }

    async scrollAdd() {
        const loader: HTMLDivElement = document.querySelector('.loader');
        const list: HTMLDivElement = document.querySelector('.all-list');

        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            if (SerialsViewClass.has) {
                SerialsViewClass.currentOffset += 20;


                loader.style.opacity = '1';

                try {
                    const { movCompBody } = await MovieCompilationModel.getMovies(20, SerialsViewClass.currentOffset);
                    this.movieCompilation = new MovieCompilationModel(0, movCompBody,-1);
                    // @ts-ignore
                    FilmsViewClass.has = movCompBody.has_next_page;

                    const listFilms = new ListFilmsClass(this.movieCompilation);

                    loader.style.opacity = '0';

                    list.innerHTML += listFilms.render();
                    // @ts-ignore
                    list.lastChild.style.justifyContent = 'space-between';
                } catch {

                }
            }
        }
    }

    unmount(): void {
        window.removeEventListener('scroll', this.scrollAdd);
    }
}
