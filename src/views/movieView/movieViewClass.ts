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
import SecondGenreClass from "Components/secondGenre/secondGenre";
import ActorsClass from "Components/actors/actorsClass";
import {routes} from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import {MovieData, User} from "../../types";
import EpisodesClass from "../../components/episodes/episodesClass";
import MovieCompilationView from "../movieCompilationView/movieCompilationView"
import UserLikeView from "../userLikeView/userLikeView"

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

            const {user} = await UserModel.auth();
            if (!user) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            this.user = new UserModel(user);

            const id = +/\d+/.exec(window.location.pathname);


            const {movie} = await MovieModel.getMovie(id);
            console.log(movie);
            this.movie = new MovieModel(movie);
            if (!this.movie.checkMovie) {
                this.seasonsCompilation = this.movie.seasonsData.map(
                    (movieCompilationData, index) =>
                        new MovieCompilationModel(
                            index,
                            movieCompilationData.episodes,
                            id
                        ));
            }

            const {movCompBody} = await MovieCompilationModel.getMovieCompilationMovie(id);
            this.movieCompilation = new MovieCompilationModel(0, movCompBody);
            const {ratingBody} = await UserModel.getRating(id);

            const header = new HeaderClass(this.user.userData);
            const headMovie = new HeadMovieClass(this.movie.movieData);
            const firstInfoMovie = new FirstInfoMovieClass(
                ratingBody.rating,
                this.movie.movieData
            );
            const secondGenre = new SecondGenreClass(this.movie.movieData);
            const footer = new FooterClass();

            const common = {
                movieImg: this.movie.movieData,
                header: header.render(),
                headMovie: headMovie.render(),
                firstInfoMovie: firstInfoMovie.render(),
                secondGenre: secondGenre.render(),
                select: this.compilationsRender(this.movieCompilation),
                footer: footer.render(),
            }
            if (this.movie.movieData.staff == null) {

                if (this.movie.movieData.is_movie || this.seasonsCompilation == null) {
                    super.render(movieViewTemplate, {
                        ...common,
                    });
                } else {
                    const episodes = new EpisodesClass(this.seasonsCompilation.length);
                    super.render(movieViewTemplate, {
                        ...common,
                        episodes: episodes.render(),
                        seasons: this.seasonsRender(this.seasonsCompilation),

                    });
                }
            } else {
                const actors = new ActorsClass(this.movie.movieData);
                if (this.movie.movieData.is_movie) {
                    super.render(movieViewTemplate, {
                        ...common,
                        actors: actors.render(),

                    });
                } else {
                    const episodes = new EpisodesClass(this.seasonsCompilation.length);
                    super.render(movieViewTemplate, {
                        ...common,
                        episodes: episodes.render(),
                        seasons: this.seasonsRender(this.seasonsCompilation),
                        actors: actors.render(),
                    });
                }
            }

            handlerLink();
            header.setHandler();
            if (!this.seasonsCompilation) {
                firstInfoMovie.setHandlerMovie();
            }
            firstInfoMovie.setHandlers();

            MovieCompilationView.setHandler(this.movieCompilation.movieCompilationData);
            if (this.seasonsCompilation !== null) {
                this.seasonsCompilation.forEach((carousel) => {
                    MovieCompilationView.setHandler(carousel.movieCompilationData);
                });
                this.setHandler();
            }

            const {likesBody} = await UserModel.getLikes()
            const likesData = await Promise.resolve(likesBody);

            UserLikeView.setAllLikes(likesData.favorites.id);
            UserLikeView.setHandler();
            // this.refreshRating();

        } catch (err) {
            console.error(err)
            //router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(): void {
        if (!this.movie.checkMovie) {

            const episodes: HTMLDivElement = document.querySelector(".episodes");
            if (episodes) {
                if (episodes.childNodes.length === 0) {
                    episodes.style.marginTop = "0";
                }
            }

            const season: Array<HTMLDivElement> = [];

            for (let i = 0; i < this.seasonsCompilation.length; ++i) {
                season[i] = document.querySelector(`.car` + `${i + 1}`);
                if (i !== 0) {
                    if (season[i]) {
                        season[i].style.display = 'none';
                    }
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

    }

    compilationsRender(movieCompilation: MovieCompilationModel): string {
        return (
            '<div class = "margin-bottom movie-carousel margin-person">' +
            MovieCompilationView.render(movieCompilation.movieCompilationData) +
            "</div>"
        );
    }

    seasonsRender(movieCompilations: MovieCompilationModel[]) {
        let select = "";
        movieCompilations.forEach((carousel, index) => {
            let carouselBlock = "";
            carouselBlock = `<div class = "car${index + 1}">` + MovieCompilationView.render(carousel.movieCompilationData) + `</div>`;
            select += carouselBlock;
        });
        return select;
    }



    // refreshRating() {
    //     const refresh = document.getElementById("refresh");
    //     refresh.addEventListener("click", () => {
    //         this.changeRating();
    //     })
    // }

    unmount() {
       // this.changeRating();
        if (this.seasonsCompilation) {
            this.seasonsCompilation.forEach((carousel) => {
                MovieCompilationView.unmount(carousel.movieCompilationData);
            });
        }


        // removeEvent
    }

}
