import movieViewTemplate from "./movieView.pug";
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
import {routes} from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import {MovieData, User} from "../../types";
import EpisodesClass from "../../components/episodes/episodesClass";

import "./movie.scss";

export default class MovieViewClass extends BaseViewClass {
    private user: UserModel;
    private movie: MovieModel;
    private movieCompilation: MovieCompilationModel;
    private seasonsCompilation: Array<MovieCompilationModel> = null;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const {isAuth, userBody} = await UserModel.auth();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }

            const userData: User = await Promise.resolve(userBody);
            this.user = new UserModel(userData.user);

            const id = +/\d+/.exec(window.location.pathname);

            const {movBody}: { movBody?: Promise<any> } =
                await MovieModel.getMovie(id);
            const movData = await Promise.resolve(movBody);

            if (movData.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);
                return;
            }

            this.movie = new MovieModel(movData);
            if (!this.movie.checkMovie) {
                this.seasonsCompilation = this.movie.seasonsData.map(
                    (movieCompilationData, index) =>
                        new MovieCompilationModel(
                            index,
                            movieCompilationData.episodes,
                            id
                        ));
            }

            const {movCompBody}: { movCompBody?: Promise<any> } =
                await MovieCompilationModel.getMovieCompilationMovie(id);
            const movieCompilationData = await Promise.resolve(movCompBody);
            this.movieCompilation = new MovieCompilationModel(
                0,
                movieCompilationData,
            );

            const header = new HeaderClass(this.user.userData);
            const headMovie = new HeadMovieClass(this.movie.movieData);
            const firstInfoMovie = new FirstInfoMovieClass(
                this.movie.movieData
            );
            const secondGenre = new SecondGenreClass(this.movie.movieData);
            const footer = new FooterClass();

            if (this.movie.movieData.staff === null) {
                if (this.movie.movieData.is_movie) {
                    super.render(movieViewTemplate, {
                        movieImg: this.movie.movieData,
                        header: header.render(),
                        headMovie: headMovie.render(),
                        firstInfoMovie: firstInfoMovie.render(),
                        secondGenre: secondGenre.render(),
                        select: this.compilationsRender(this.movieCompilation),
                        footer: footer.render(),
                    });
                } else {
                    const episodes = new EpisodesClass(this.seasonsCompilation.length);

                    super.render(movieViewTemplate, {
                        movieImg: this.movie.movieData,
                        header: header.render(),
                        episodes: episodes.render(),
                        seasons: this.seasonsRender(this.seasonsCompilation),
                        headMovie: headMovie.render(),
                        firstInfoMovie: firstInfoMovie.render(),
                        secondGenre: secondGenre.render(),
                        select: this.compilationsRender(this.movieCompilation),
                        footer: footer.render(),
                    });

                }
            } else {
                const actors = new ActorsClass(this.movie.movieData);

                if (this.movie.movieData.is_movie) {
                    super.render(movieViewTemplate, {
                        movieImg: this.movie.movieData,
                        header: header.render(),
                        headMovie: headMovie.render(),
                        actors: actors.render(),
                        firstInfoMovie: firstInfoMovie.render(),
                        secondGenre: secondGenre.render(),
                        select: this.compilationsRender(this.movieCompilation),
                        footer: footer.render(),
                    });
                } else {
                    const episodes = new EpisodesClass(this.seasonsCompilation.length);

                    super.render(movieViewTemplate, {
                        movieImg: this.movie.movieData,
                        header: header.render(),
                        episodes: episodes.render(),
                        seasons: this.seasonsRender(this.seasonsCompilation),
                        headMovie: headMovie.render(),
                        actors: actors.render(),
                        firstInfoMovie: firstInfoMovie.render(),
                        secondGenre: secondGenre.render(),
                        select: this.compilationsRender(this.movieCompilation),
                        footer: footer.render(),
                    });
                }
            }

            handlerLink();
            header.setHandler();

            firstInfoMovie.setHandlers();
            this.movieCompilation.setHandler();
            if (this.seasonsCompilation !== null) {
                this.seasonsCompilation.forEach((carousel) => {
                    carousel.setHandler();
                });
                this.setHandler();
            }

            const {likesBody} = await UserModel.getLikes()
            const likesData = await Promise.resolve(likesBody);

            this.user.setAllLikes(likesData.favorites.id);
            this.user.setHandler();

        } catch (err) {
            console.error(err)
            //router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(): void {
        const episodes: HTMLDivElement = document.querySelector(".episodes");

        if (episodes.childNodes.length === 0) {
            episodes.style.marginTop = "0";
        }

        const season: Array<HTMLDivElement> = [];
        for (let i = 0; i < this.seasonsCompilation.length; ++i) {
            season[i] = document.querySelector(`.car` + `${i + 1}`);
            if (i !== 0) {
                season[i].style.display = 'none';
            }
        }

        const buttons: Array<HTMLButtonElement> = [];
        for (let i = 0; i < this.seasonsCompilation.length; ++i) {
            buttons[i] = document.querySelector(`.season` + `${i + 1}`);
            buttons[i].addEventListener('click', () => {

                for (let j = 0; j < this.seasonsCompilation.length; ++j) {
                    if (i !== j) {
                        season[j].style.display = 'none';
                    } else {
                        buttons.forEach((item) => {
                            item.style.backgroundColor = '#01090b';
                        })

                        buttons[i].style.backgroundColor = '#595959';
                        season[j].style.display = '';
                    }
                }
            });
        }

        buttons[0].style.backgroundColor = '#595959';
    }

    compilationsRender(movieCompilation: MovieCompilationModel): string {
        return (
            '<div class = "margin-bottom movie-carousel margin-person">' +
            movieCompilation.render() +
            "</div>"
        );
    }

    seasonsRender(movieCompilations: MovieCompilationModel[]) {
        let select = "";
        movieCompilations.forEach((carousel, index) => {
            let carouselBlock = "";
            carouselBlock = `<div class = "car${index + 1}">` + carousel.render() + `</div>`;
            select += carouselBlock;
        });
        return select;
    }

}
