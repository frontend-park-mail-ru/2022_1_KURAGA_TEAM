import homeViewTemplate from "./homeView.pug";
import HeaderClass from "Components/header/headerClass";
import MainMovieClass from "Components/mainMovie/mainMovieClass";
import FooterClass from "Components/footer/footerClass";
import handlerLink from "Utils/handlerLink";
import router from "Routing/router";
import BaseViewClass from "../baseView/baseViewClass";
import {routes} from "Routing/constRouting";
import LoaderViewClass from "../loaderView/loaderViewClass";
import UserModel from "../../models/User";
import MovieModel from "../../models/Movie";
import MovieCompilationModel from "../../models/MovieCompilation";
import MovieCompilationView from "../movieCompilationView/movieCompilationView"
import UserLikeView from "../userLikeView/userLikeView"
import PopUpClass from "Components/popUp/popUpClass";
import "../../css/home.scss";
import {User} from "../../types";

export default class HomeViewClass extends BaseViewClass {
    private static user: UserModel;
    private static mainMovie: MovieModel;
    private movieCompilations: Array<MovieCompilationModel>;
    private header = new HeaderClass("user");

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();


            const {user} = await UserModel.auth();
            if (!user) {

                router.go(routes.LOGIN_VIEW);
                return;
            }

            HomeViewClass.user = new UserModel(user);

            const {movie} = await MovieModel.mainMov();
            HomeViewClass.mainMovie = new MovieModel(movie);

            const {movCompBody} = await MovieCompilationModel.getMovieCompilations();
            this.movieCompilations = movCompBody.map(
                (movieCompilationData, index) =>
                    new MovieCompilationModel(
                        index,
                        movieCompilationData,
                    )
            );

            this.header = new HeaderClass(HomeViewClass.user.userData);
            // const header = new HeaderClass(this.user.userData);
            const mainMovie = new MainMovieClass(HomeViewClass.mainMovie.movieData);
            const footer = new FooterClass();
            const popUp = new PopUpClass();

            super.render(homeViewTemplate, {
                popUp: popUp.render(),
                mainMovieImg: HomeViewClass.mainMovie.movieData,
                header: this.header.render(),
                mainMovie: mainMovie.render(),
                select: this.compilationsRender(this.movieCompilations),
                footer: footer.render(),
            });


            handlerLink();

            this.setHandler();

            this.checkSub();

            const {likesData} = await UserModel.getLikes()
            console.log(likesData);
            UserLikeView.setAllLikes(likesData.favorites.id);
            UserLikeView.setHandler();

            this.movieCompilations.forEach((carousel) => {
                MovieCompilationView.setHandler(carousel.movieCompilationData);
            });

        } catch (err) {
            console.log(err);
            //router.go(routes.ERROR_CATCH_VIEW)
        }
    }

    setHandler() {
        const homeNavbarMobile = document.querySelector(".homeMobile-js");
        const homeNavbar = document.querySelector(".home-js");
        const nameProfile = document.querySelector(".name-profile-mobile");
        nameProfile.classList.add("headline-style");
        homeNavbarMobile.classList.add("headline-style");
        homeNavbar.classList.add("headline-style");

        if(this.header){
            this.header.setHandler();
        }

    }

    compilationsRender(movieCompilations: MovieCompilationModel[]) {
        let select = "";
        movieCompilations.forEach((carousel, index) => {
            let carouselBlock = "";
            switch (index) {
                case 0:
                    carouselBlock =
                        '<div class = "first">' + MovieCompilationView.render(carousel.movieCompilationData) + "</div>";
                    break;
                case movieCompilations.length - 1:
                    carouselBlock =
                        '<div class = "last">' + MovieCompilationView.render(carousel.movieCompilationData) + "</div>";
                    break;
                default:
                    carouselBlock = "<div>" + MovieCompilationView.render(carousel.movieCompilationData) + "</div>";
            }
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
        const playButton: HTMLButtonElement = document.querySelector('.btn');

        playButton.addEventListener('click', this.openPopUp, { capture: true });
    }

    openPopUp(e: any): void {
        e.stopPropagation();

        const userDate = new Date(HomeViewClass.user.data.date);
        const nowDate = new Date();

        document.addEventListener('click', HomeViewClass.closePopUP);

        if (nowDate > userDate) {
            const popUpBtn: HTMLButtonElement = document.querySelector('.menu-button');

            popUpBtn.addEventListener('click', HomeViewClass.subscription);

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

        router.go(`/player/${HomeViewClass.mainMovie.movieData.id}/movie`);
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

        const sub = UserModel.subscription(payToken);
    }

    unmount(): void {
        const playButton: HTMLButtonElement = document.querySelector('.btn');

        if (playButton !== null) {
            playButton.removeEventListener('click', this.openPopUp, { capture: true });
            document.removeEventListener('click', HomeViewClass.closePopUP);

            if (this.movieCompilations) {
                this.movieCompilations.forEach((carousel) => {
                    MovieCompilationView.unmount(carousel.movieCompilationData);
                });
            }
        }
    }
}
