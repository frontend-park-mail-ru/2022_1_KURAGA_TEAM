import serialViewTemplate from "./serialView.pug";
import HeaderClass from "Components/header/headerClass";
import handlerLink from "Utils/handlerLink";
import UserModel from "../../models/User";
import MovieModel from "../../models/Movie";
import MovieCompilationModel from "../../models/MovieCompilation";
import router from "Routing/router.ts";
import HeadMovieClass from "Components/headMovie/headMovieClass";
import FooterClass from "Components/footer/footerClass";
import FirstInfoMovieClass from "Components/firstInfoMovie/firstInfoMovieClass";
import SecondGenreClass from "Components/secondGende/secondGenre";
import ActorsClass from "Components/actors/actorsClass";
import { routes } from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import { User } from "../../types";
import EpisodesClass from "../../components/episodes/episodesClass";

import "../movieView/movie.scss";
import "./serial.scss";

export default class SerialViewClass extends BaseViewClass {
    private user: UserModel;
    private movie: MovieModel;
    private movieCompilation: MovieCompilationModel;
    private movieCompilationMobile: MovieCompilationModel;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const { isAuth, userBody } = await UserModel.auth();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }

            const userData: User = await Promise.resolve(userBody);
            this.user = new UserModel(userData.user);

            const id = +/\d+/.exec(window.location.pathname);

            const { movBody }: { movBody?: Promise<any> } =
                await MovieModel.getMovie(id);
            const movData = await Promise.resolve(movBody);

            if (movData.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);

                return;
            }

            this.movie = new MovieModel(movData);
            console.log(movData, 1)

            const { movCompBody }: { movCompBody?: Promise<any> } =
                await MovieCompilationModel.getMovieCompilationMovie(id);
            const movieCompilationData = await Promise.resolve(movCompBody);

            this.movieCompilation = new MovieCompilationModel(
                0,
                movieCompilationData,
                false
            );
            this.movieCompilationMobile = new MovieCompilationModel(
                0,
                movieCompilationData,
                true
            );

            const header = new HeaderClass(this.user.userData);
            const headMovie = new HeadMovieClass(this.movie.movieData);
            const episodes = new EpisodesClass();
            const firstInfoMovie = new FirstInfoMovieClass(
                this.movie.movieData
            );
            const secondGenre = new SecondGenreClass(this.movie.movieData);
            const actors = new ActorsClass(this.movie.movieData);
            const footer = new FooterClass();

            super.render(serialViewTemplate, {
                movieImg: this.movie.movieData,
                header: header.render(),
                headMovie: headMovie.render(),
                episodes: episodes.render(),
                series: this.compilationsRender(this.movieCompilation),
                seriesMobile: this.compilationsRender(
                    this.movieCompilationMobile
                ),
                firstInfoMovie: firstInfoMovie.render(),
                secondGenre: secondGenre.render(),
                actors: actors.render(),
                select: this.compilationsRender(this.movieCompilation),
                selectMobile: this.compilationsRender(
                    this.movieCompilationMobile
                ),
                footer: footer.render(),
            });

            handlerLink();
            this.setHandler();
            firstInfoMovie.setHandlers();
            this.movieCompilation.setHandler();
            this.movieCompilationMobile.setHandler();

            header.setHandler();
        } catch (err) {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(): void {
        const staff = document.querySelector(".group__staff");
        const staffText: HTMLDivElement =
            document.querySelector(".third-part-actors");

        if (staff.childNodes.length === 0) {
            staffText.style.display = "none";
        }
    }
    compilationsRender(movieCompilation: MovieCompilationModel): string {
        return (
            '<div class = "margin-person">' +
            movieCompilation.render() +
            "</div>"
        );
    }
}
