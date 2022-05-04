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
            const {isAuth, userBody} = await UserModel.auth();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }

            const id = +/\d+/.exec(window.location.pathname);

            const userData: User = await Promise.resolve(userBody);
            this.user = new UserModel(userData.user);

            const { movCompBody }: { movCompBody?: Promise<any> } = await MovieCompilationModel.getGenre(id);
            const movieCompilationsData = await Promise.resolve(movCompBody);

            this.movieCompilation = new MovieCompilationModel(0, movieCompilationsData);

            const header = new HeaderClass(this.user.userData);
            const listFilms = new ListFilmsClass(this.movieCompilation);

            super.render(genreViewTemplate, {
                genre: this.movieCompilation.movieCompilationData.compilationName,
                header: header.render(),
                listFilms: listFilms.render(),
            });

            handlerLink();
            const {likesBody}  = await UserModel.getLikes()
            const likesData = await Promise.resolve(likesBody);
            UserLikeView.setAllLikes(likesData.favorites.id);
            UserLikeView.setHandler();
            header.setHandler();
            this.setHandler(id);
        } catch {
            router.go(routes.ERROR_CATCH_VIEW)
        }
    }

    setHandler(id: number) {
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

        const currGenre: HTMLAnchorElement = document.querySelector(`.genre-${id}-js`);
        const listGenres: HTMLDivElement = document.querySelector('.list-genres');
        const firstGenre = listGenres.firstChild;

        currGenre.style.backgroundColor = 'var(--mix-color)';

        let parentCurr = currGenre.parentNode;
        let nextCurr = currGenre.nextSibling;

        if (nextCurr === firstGenre) {
            parentCurr.insertBefore(firstGenre, currGenre);
        } else {
            firstGenre.parentNode.insertBefore(currGenre, firstGenre);

            if (nextCurr) {
                parentCurr.insertBefore(firstGenre, nextCurr);
            } else {
                parentCurr.appendChild(firstGenre);
            }
        }
    }
}
