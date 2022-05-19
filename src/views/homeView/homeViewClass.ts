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
import "../../css/home.scss";
import {User} from "../../types";

export default class HomeViewClass extends BaseViewClass {
    private user: UserModel;
    private mainMovie: MovieModel;
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
          
            this.user = new UserModel(user);

            const {movie} = await MovieModel.mainMov();
            this.mainMovie = new MovieModel(movie);

            const {movCompBody} = await MovieCompilationModel.getMovieCompilations();
            this.movieCompilations = movCompBody.map(
                (movieCompilationData, index) =>
                    new MovieCompilationModel(
                        index,
                        movieCompilationData,
                    )
            );


            this.header = new HeaderClass(this.user.userData);
            // const header = new HeaderClass(this.user.userData);
            const mainMovie = new MainMovieClass(this.mainMovie.movieData);
            const footer = new FooterClass();

            super.render(homeViewTemplate, {
                mainMovieImg: this.mainMovie.movieData,
                header: this.header.render(),
                mainMovie: mainMovie.render(),
                select: this.compilationsRender(this.movieCompilations),
                footer: footer.render(),
            });


            handlerLink();
            this.setHandler();


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

    unmount() {
        if (this.movieCompilations) {
            this.movieCompilations.forEach((carousel) => {
                MovieCompilationView.unmount(carousel.movieCompilationData);
            });
        }
    }
}
