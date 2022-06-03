import filmsViewTemplate from "./filmsView.pug";
import HeaderClass from "Components/header/headerClass";
import UserModel from "../../models/User";
import handlerLink from "Utils/handlerLink";
import router from "Routing/router";
import FooterClass from "Components/footer/footerClass";
import {routes} from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import {User} from "../../types";
import ListFilmsClass from "../../components/listFilms/listFilmsClass";
import MovieCompilationModel from "../../models/MovieCompilation";
import LoaderViewClass from "../loaderView/loaderViewClass";
import UserLikeView from "../userLikeView/userLikeView"
import AutoBind from "Utils/autoBind"

import "./films.scss";

export default class FilmsViewClass extends BaseViewClass {
    private user: UserModel;
    private movieCompilation: MovieCompilationModel;
    private static has: boolean;
    private static currentOffset: number;
    private static isLoading: boolean;

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

            FilmsViewClass.currentOffset = 0;
            FilmsViewClass.isLoading = false;

            const { movCompBody } = await MovieCompilationModel.getMovies(20, FilmsViewClass.currentOffset);
            this.movieCompilation = new MovieCompilationModel(0, movCompBody,-1);

            const header = new HeaderClass(this.user.userData);
            const listFilms = new ListFilmsClass(this.movieCompilation);

            super.render(filmsViewTemplate, {
                header: header.render(),
                listFilms: listFilms.render(),
            })

            const autoBind = new AutoBind(".all-list");
            autoBind.setVariableStyle("flexContentList","space-between");

            const {likesData} = await UserModel.getLikes()
            UserLikeView.setAllLikes(likesData.favorites.id);

            // @ts-ignore
            FilmsViewClass.has = movCompBody.has_next_page;

            this.setHandler();
            handlerLink();

            UserLikeView.setHandler();
            header.setHandler();
        } catch(err) {
            console.error(err)
            //router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler() {
        const filmsNavbar: HTMLAnchorElement = document.querySelector(".font-nav.movie-js");
        const filmsMobileNavbar: HTMLAnchorElement = document.querySelector(".menu-mobile__nav.movie-js");
        filmsMobileNavbar.classList.add("headline-style");
        filmsNavbar.classList.add("headline-style");

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
            if (FilmsViewClass.has) {
                FilmsViewClass.currentOffset += 20;

                loader.style.opacity = '1';

                try {
                    if (!FilmsViewClass.isLoading) {
                        FilmsViewClass.isLoading = true;

                        const { movCompBody } = await MovieCompilationModel.getMovies(20, FilmsViewClass.currentOffset);
                        this.movieCompilation = new MovieCompilationModel(0, movCompBody,-1);
                        // @ts-ignore
                        FilmsViewClass.has = movCompBody.has_next_page;

                        const listFilms = new ListFilmsClass(this.movieCompilation);

                        loader.style.opacity = '0';

                        list.innerHTML += listFilms.render();
                        // @ts-ignore
                        list.lastChild.style.justifyContent = 'space-between';

                        FilmsViewClass.isLoading = false;
                    }
                } catch {

                }
            }
        }
    }

    unmount() {
        window.removeEventListener('scroll', this.scrollAdd);
    }
}
