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

import "./films.scss";

export default class FilmsViewClass extends BaseViewClass {
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

            let currentOffset = 0;
            const { movCompBody } = await MovieCompilationModel.getMovies(30, currentOffset);
            this.movieCompilation = new MovieCompilationModel(0, movCompBody,-1);

            const header = new HeaderClass(this.user.userData);
            const listFilms = new ListFilmsClass(this.movieCompilation);

            super.render(filmsViewTemplate, {
                header: header.render(),
                listFilms: listFilms.render(),
            });
            const {likesData} = await UserModel.getLikes()
            UserLikeView.setAllLikes(likesData.favorites.id);

            this.setHandler(currentOffset);
            handlerLink();

            UserLikeView.setHandler();
            header.setHandler();
        } catch(err) {
            console.error(err)
            //router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(currentOffset: number) {
        const filmsNavbar: HTMLAnchorElement = document.querySelector(".font-nav.movie-js");
        const filmsMobileNavbar: HTMLAnchorElement = document.querySelector(".menu-mobile__nav.movie-js");

        filmsNavbar.style.backgroundColor = "#2C51B1";
        filmsNavbar.style.webkitBackgroundClip = "text";
        filmsNavbar.style.webkitTextFillColor = "transparent";
        filmsNavbar.style.backgroundImage = "linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)";

        filmsMobileNavbar.style.backgroundColor = "#2C51B1";
        filmsMobileNavbar.style.webkitBackgroundClip = "text";
        filmsMobileNavbar.style.webkitTextFillColor = "transparent";
        filmsMobileNavbar.style.backgroundImage = "linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)";

        // TODO СДЕЛАТЬ ПАДДИНГ

        // const loader: HTMLDivElement = document.querySelector('.loader');
        // const list: HTMLDivElement = document.querySelector('.all-list');

        // window.addEventListener('scroll', async () => {
        //     const {
        //         scrollTop,
        //         scrollHeight,
        //         clientHeight
        //     } = document.documentElement;
        //
        //     if (scrollTop + clientHeight >= scrollHeight - 5) {
        //         currentOffset += 30;
        //
        //         // TODO ЧТО-ТО С ЛОАДЕРОМ
        //
        //         try {
        //             const { movCompBody }: { movCompBody?: Promise<any> } = await MovieCompilationModel.getMovies(30, currentOffset);
        //             const movieCompilationsData = await Promise.resolve(movCompBody);
        //
        //             this.movieCompilation = new MovieCompilationModel(0, movieCompilationsData);
        //
        //             const listFilms = new ListFilmsClass(this.movieCompilation);
        //
        //             // TODO ЧТО-ТО С ЛОАДЕРОМ
        //
        //             list.innerHTML += listFilms.render();
        //         } catch {
        //
        //         }
        //     }
        // });
    }

    unmount() {
        // removeEvent
    }
}
