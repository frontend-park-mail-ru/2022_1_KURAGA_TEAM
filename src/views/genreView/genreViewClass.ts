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
            const loader = new LoaderViewClass();
            loader.render();

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
            console.log(this.movieCompilation)

            const header = new HeaderClass(this.user.userData);
            const listFilms = new ListFilmsClass(this.movieCompilation);
            const footer = new FooterClass();

            super.render(genreViewTemplate, {
                genre: this.movieCompilation.movieCompilationData.compilationName,
                header: header.render(),
                listFilms: listFilms.render(),
                footer: footer.render(),
            });

            handlerLink();
            header.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}
