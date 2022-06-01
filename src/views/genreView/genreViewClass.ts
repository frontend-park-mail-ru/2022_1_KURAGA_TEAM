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
import AutoBind from "Utils/autoBind"
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
            const autoBind = new AutoBind(".all-list");
            autoBind.setVariableStyle("flexContentList","flex-start");
            const {likesData} = await UserModel.getLikes()
            UserLikeView.setAllLikes(likesData.favorites.id);

            const genreNavbar: HTMLAnchorElement = document.querySelector(".font-nav.genre-js");
            const genreMobileNavbar: HTMLAnchorElement = document.querySelector(".menu-mobile__nav.genre-js");
            genreNavbar.classList.add("headline-style");
            genreMobileNavbar.classList.add("headline-style");



            handlerLink();
            ListFilmsClass.setHandler();
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
        const genres: HTMLDivElement = document.querySelector('.list-genres');
        const btnFull: HTMLDivElement = document.querySelector('.open-full');

        btnFull.addEventListener('click', () => {
            if (genres.classList.length === 1) {
                genres.classList.add('full-list');
                btnFull.textContent = 'Скрыть все';

                return;
            }

            genres.classList.remove('full-list');
            btnFull.textContent = 'Раскрыть все';
        });

        currGenre.style.backgroundColor = 'var(--mix-color)';
    }

    unmount() {
        // removeEvent
    }
}
