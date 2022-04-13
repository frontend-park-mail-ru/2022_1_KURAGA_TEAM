import homeViewTemplate from "./homeView.pug";
import HeaderClass from "Components/header/headerClass";
import MainMovieClass from "Components/mainMovie/mainMovieClass";
import FooterClass from "Components/footer/footerClass";
import handlerLink from "Utils/handlerLink";
import router from "Routing/router";
import BaseViewClass from "../baseView/baseViewClass";
import { routes } from "Routing/constRouting";
import LoaderViewClass from "../loaderView/loaderViewClass";
import UserModel from "../../models/User";
import MovieModel from "../../models/Movie";
import MovieCompilationModel from "../../models/MovieCompilation";
import "../../css/home.scss";
import { User } from "../../types";

export default class HomeViewClass extends BaseViewClass {
    private user: UserModel;
    private mainMovie: MovieModel;
    private movieCompilations: Array<MovieCompilationModel>;
    private movieCompilationsMobile: Array<MovieCompilationModel>;

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

            const { movBody }: { movBody?: Promise<any> } =
                await MovieModel.mainMov();
            const mainMovieData = await Promise.resolve(movBody);
            this.mainMovie = new MovieModel(mainMovieData);

            const { movCompBody }: { movCompBody?: Promise<any> } =
                await MovieCompilationModel.getMovieCompilations();
            const movieCompilationsData = await Promise.resolve(movCompBody);

            this.movieCompilations = movieCompilationsData.map(
                (movieCompilationData, index) =>
                    new MovieCompilationModel(
                        index,
                        movieCompilationData,
                        false
                    )
            );
            this.movieCompilationsMobile = movieCompilationsData.map(
                (movieCompilationData, index) =>
                    new MovieCompilationModel(index, movieCompilationData, true)
            );

            const header = new HeaderClass(this.user.userData);
            const mainMovie = new MainMovieClass(this.mainMovie.movieData);
            const footer = new FooterClass();

            super.render(homeViewTemplate, {
                mainMovieImg: this.mainMovie.movieData,
                header: header.render(),
                mainMovie: mainMovie.render(),
                select: this.compilationsRender(this.movieCompilations),
                selectMobile: this.compilationsRender(
                    this.movieCompilationsMobile
                ),
                footer: footer.render(),
            });

            handlerLink();
            this.setHandler();

            header.setHandler();
            this.movieCompilations.forEach((carousel) => {
                carousel.setHandler();
            });
            this.movieCompilationsMobile.forEach((carousel) => {
                carousel.setHandler();
            });
        } catch (err) {
            console.error(err);
        }
    }

    setHandler() {
        const homeNavbarMobile = document.querySelector(".homeMobile-js");
        const homeNavbar = document.querySelector(".home-js");
        const nameProfile = document.querySelector(".name-profile-mobile");

        nameProfile.classList.add("headline-style");
        homeNavbarMobile.classList.add("headline-style");
        homeNavbar.classList.add("headline-style");
    }

    compilationsRender(movieCompilations: MovieCompilationModel[]) {
        let select = "";
        movieCompilations.forEach((carousel, index) => {
            let carouselBlock = "";
            switch (index) {
                case 0:
                    carouselBlock =
                        '<div class = "first">' + carousel.render() + "</div>";
                    break;
                case movieCompilations.length - 1:
                    carouselBlock =
                        '<div class = "last">' + carousel.render() + "</div>";
                    break;
                default:
                    carouselBlock = "<div>" + carousel.render() + "</div>";
            }
            select += carouselBlock;
        });
        return select;
    }
}
