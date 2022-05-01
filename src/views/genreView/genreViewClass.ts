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
            console.log("like:",likesData.favorites);
            this.user.setAllLikes(likesData.favorites.id);
            this.user.setHandler();
            header.setHandler();
            this.setHandler(id);
        } catch (err) {
            console.error(err);
        }
    }

    setHandler(id: number) {
        const currGenre: HTMLAnchorElement = document.querySelector(`.genre-${id}-js`);
        const listGenres: HTMLDivElement = document.querySelector('.list-genres');
        const firstGenre = listGenres.firstChild;

        currGenre.style.backgroundColor = '#744fa9';

        let temp = document.createElement('a');
        firstGenre.parentNode.insertBefore(temp, firstGenre);

        currGenre.parentNode.insertBefore(firstGenre, currGenre);

        temp.parentNode.insertBefore(currGenre, temp);

        temp.parentNode.removeChild(temp);

        // let parentCurr = currGenre.parentNode;
        // let nextCurr = currGenre.nextSibling;
        //
        // if (nextCurr === firstGenre) {
        //     parentCurr.insertBefore(firstGenre, currGenre);
        // } else {
        //     firstGenre.parentNode.insertBefore(currGenre, firstGenre);
        //
        //     if (nextCurr) {
        //         parentCurr.insertBefore(firstGenre, nextCurr);
        //     } else {
        //         parentCurr.appendChild(firstGenre);
        //     }
        // }
    }
}
