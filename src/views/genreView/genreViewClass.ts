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

            const id = +/\d+/.exec(window.location.pathname);

            GenreViewClass.currentOffset = 0;
            GenreViewClass.isLoading = false;

            const { movCompBody } = await MovieCompilationModel.getGenre(id, 20, GenreViewClass.currentOffset);
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
            if (GenreViewClass.has) {
                GenreViewClass.currentOffset += 20;

                loader.style.opacity = '1';

                try {
                    if (!GenreViewClass.isLoading) {
                        GenreViewClass.isLoading = true;

                        const {movCompBody} = await MovieCompilationModel.getMovies(20, GenreViewClass.currentOffset);
                        this.movieCompilation = new MovieCompilationModel(0, movCompBody, -1);
                        // @ts-ignore
                        FilmsViewClass.has = movCompBody.has_next_page;

                        const listFilms = new ListFilmsClass(this.movieCompilation);

                        loader.style.opacity = '0';

                        list.innerHTML += listFilms.render();
                        // @ts-ignore
                        list.lastChild.style.justifyContent = 'space-between';

                        GenreViewClass.isLoading = false;
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
