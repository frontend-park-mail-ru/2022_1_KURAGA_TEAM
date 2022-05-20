import genreViewTemplate from "./genreView.pug";
import HeaderClass from "Components/header/headerClass";
import UserModel from "../../models/User";
import router from "Routing/router";
import FooterClass from "Components/footer/footerClass";
import {routes} from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import {User} from "../../types";
import handlerLink from "Utils/handlerLink";
import ListFilmsClass from "../../components/listFilms/listFilmsClass";
import MovieCompilationModel from "../../models/MovieCompilation";
import LoaderViewClass from "../loaderView/loaderViewClass";
import UserLikeView from "../userLikeView/userLikeView"

import "../filmsView/films.scss";

export default class GenreViewClass extends BaseViewClass {
    private user: UserModel;
    private movieCompilation: MovieCompilationModel;

    async render() {
        try {

            const {user} = await UserModel.auth();
            if (!user) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            this.user = new UserModel(user);

            const id = +/\d+/.exec(window.location.pathname);


            const { movCompBody } = await MovieCompilationModel.getGenre(id);
            this.movieCompilation = new MovieCompilationModel(0, movCompBody);

            const header = new HeaderClass(this.user.userData);
            const listFilms = new ListFilmsClass(this.movieCompilation);

            super.render(genreViewTemplate, {
                genre: this.movieCompilation.movieCompilationData.compilationName,
                header: header.render(),
                listFilms: listFilms.render(),
            });
            const genreNavbar: HTMLAnchorElement = document.querySelector(".font-nav.genre-js");
            const genreMobileNavbar: HTMLAnchorElement = document.querySelector(".menu-mobile__nav.genre-js");

            genreNavbar.style.backgroundColor = "#2C51B1";
            genreNavbar.style.webkitBackgroundClip = "text";
            genreNavbar.style.webkitTextFillColor = "transparent";
            genreNavbar.style.backgroundImage = "linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)";

            genreMobileNavbar.style.backgroundColor = "#2C51B1";
            genreMobileNavbar.style.webkitBackgroundClip = "text";
            genreMobileNavbar.style.webkitTextFillColor = "transparent";
            genreMobileNavbar.style.backgroundImage = "linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)";

            handlerLink();
            const {likesData} = await UserModel.getLikes()

            UserLikeView.setAllLikes(likesData.favorites.id);
            UserLikeView.setHandler();
            header.setHandler();
            this.setHandler(id);
        } catch(err) {
            console.error(err);
            //router.go(routes.ERROR_CATCH_VIEW)
        }
    }

    setHandler(id: number) {
        const currGenre: HTMLAnchorElement = document.querySelector(`.genre-${id}-js`);

        currGenre.style.backgroundColor = 'var(--mix-color)';
    }

    unmount() {
        // removeEvent
    }
}
