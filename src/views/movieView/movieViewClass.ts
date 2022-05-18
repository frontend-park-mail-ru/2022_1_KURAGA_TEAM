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
import PopUpClass from "Components/popUp/popUpClass";
import {routes} from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import EpisodesClass from "../../components/episodes/episodesClass";
import MovieCompilationView from "../movieCompilationView/movieCompilationView"
import UserLikeView from "../userLikeView/userLikeView"

import "./movie.scss";

export default class MovieViewClass extends BaseViewClass {
    private static user: UserModel;
    private static movie: MovieModel;
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
            MovieViewClass.user = new UserModel(user);

            const id = +/\d+/.exec(window.location.pathname);


            const {movie} = await MovieModel.getMovie(id);

            MovieViewClass.movie = new MovieModel(movie);

            if (!MovieViewClass.movie.checkMovie) {
                this.seasonsCompilation = MovieViewClass.movie.seasonsData.map(
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

            const header = new HeaderClass(MovieViewClass.user.userData);
            const headMovie = new HeadMovieClass(MovieViewClass.movie.movieData);
            const firstInfoMovie = new FirstInfoMovieClass(
                ratingBody.rating,
                MovieViewClass.movie.movieData
            );
            const secondGenre = new SecondGenreClass(MovieViewClass.movie.movieData);
            const footer = new FooterClass();
            const popUp = new PopUpClass();

            const common = {
                popUp: popUp.render(),
                movieImg: MovieViewClass.movie.movieData,
                header: header.render(),
                headMovie: headMovie.render(),
                firstInfoMovie: firstInfoMovie.render(),
                secondGenre: secondGenre.render(),
                select: this.compilationsRender(this.movieCompilation),
                footer: footer.render(),
            }

            if (MovieViewClass.movie.movieData.staff == null) {

                if (MovieViewClass.movie.movieData.is_movie || this.seasonsCompilation == null) {
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
                const actors = new ActorsClass(MovieViewClass.movie.movieData);
                if (MovieViewClass.movie.movieData.is_movie) {
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

            this.checkSub();

            UserLikeView.setAllLikes(likesData.favorites.id);
            UserLikeView.setHandler();
            this.refreshRating();

        } catch (err) {
            console.error(err)
            //router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(): void {
        if (!MovieViewClass.movie.checkMovie) {

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

    static closePopUP(e: any): void {
        const popUpBg: HTMLDivElement = document.querySelector('.popUp__bg');
        const popUpBody: HTMLDivElement = document.querySelector('.popUp__body');

        if (e.target === popUpBg) {
            popUpBg.classList.remove('active');
            popUpBody.classList.remove('active');
        }
    }

    checkSub(): void {
        const playButton: HTMLButtonElement = document.querySelector('.play-button');

        playButton.addEventListener('click', this.openPopUp, { capture: true });
    }

    openPopUp(e: any): void {
        e.stopPropagation();

        const userDate = new Date(MovieViewClass.user.data.date);
        const nowDate = new Date();
        document.addEventListener('click', MovieViewClass.closePopUP);

        if (nowDate > userDate) {
            const popUpBtn: HTMLButtonElement = document.querySelector('.menu-button');

            popUpBtn.addEventListener('click', MovieViewClass.subscription);

            const popUpBg: HTMLDivElement = document.querySelector('.popUp__bg');
            const popUpBody: HTMLDivElement = document.querySelector('.popUp__body');
            const popUpClose: HTMLButtonElement = document.querySelector('.popUp__exit');

            popUpBg.classList.add('active');
            popUpBody.classList.add('active');

            popUpClose.addEventListener('click', () => {
                popUpBg.classList.remove('active');
                popUpBody.classList.remove('active');
            });

            return;
        }

        const id = +/\d+/.exec(window.location.pathname);

        if (MovieViewClass.movie.movieData.is_movie) {
            router.go(`/player/${id}/movie`);

            return;
        }

        router.go(`/player/${id}/seas=1/ep=1`);
    }

    static async subscription() {
        const error: HTMLDivElement = document.querySelector('.error');

        const dataPay = UserModel.getPayToken();

        const payToken = await dataPay;

        const dataCsrf = UserModel.getToken();

        const csrfToken = await dataCsrf;

        const {isAuth} = await UserModel.pay(csrfToken, payToken);

        if (!isAuth) {
            error.classList.add('error-active');
        }

        const check = await UserModel.subscription(payToken);
    }

    changeRating() {
        const rating: HTMLElement = document.getElementById("rating");

        const formJson = JSON.stringify({
            rating: rating.textContent.toString(),
            id: MovieViewClass.movie.id.toString()
        });

        UserModel.changeRating(formJson);
    }

    refreshRating() {
        const refresh = document.getElementById("refresh");
        refresh.addEventListener("click", () => {
            this.changeRating();
        })
    }

    unmount(): void  {
        const playButton: HTMLButtonElement = document.querySelector('.play-button');

        if (this.seasonsCompilation) {
            this.seasonsCompilation.forEach((carousel) => {
                MovieCompilationView.unmount(carousel.movieCompilationData);
            });
        }
        const refresh = document.getElementById("refresh");
        if (refresh) {
            refresh.removeEventListener("click", () => {
                this.changeRating();
            })
        }


        playButton.removeEventListener('click', this.openPopUp, { capture: true });
        document.removeEventListener('click', MovieViewClass.closePopUP);
    }
}
