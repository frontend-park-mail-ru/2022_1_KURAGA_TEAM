import homeViewTemplate from "./favoritesView.pug";
import HeaderClass from "Components/header/headerClass";
import FooterClass from "Components/footer/footerClass";
import handlerLink from "Utils/handlerLink";
import router from "Routing/router";
import BaseViewClass from "../baseView/baseViewClass";
import {routes} from "Routing/constRouting";
import LoaderViewClass from "../loaderView/loaderViewClass";
import UserModel from "../../models/User";
import MovieModel from "../../models/Movie";
import MovieCompilationModel from "../../models/MovieCompilation";
import "./favorites.scss";
import {User} from "../../types";

export default class FavoritesViewClass extends BaseViewClass {
    private user: UserModel;
    private movieCompilations: Array<MovieCompilationModel>;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            console.log("aefef");
            const {isAuth, userBody} = await UserModel.auth();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            console.log(userBody);
            const userData: User = await Promise.resolve(userBody);
            this.user = new UserModel(userData.user);


            const {movCompBody}: { movCompBody?: Promise<any> } =
                await MovieCompilationModel.getFavorites();
            const movieCompilationsData = await Promise.resolve(movCompBody);

            console.log(1,movieCompilationsData);
            movieCompilationsData.forEach((i,id) => {
                if (!i.movies) {
                    movieCompilationsData.splice(id, 1);

                }
            })


            this.movieCompilations = movieCompilationsData.map(
                (movieCompilationData, index) =>
                    new MovieCompilationModel(
                        index,
                        movieCompilationData,
                    )
            );


            const header = new HeaderClass(this.user.userData);
            const footer = new FooterClass();

            super.render(homeViewTemplate, {
                header: header.render(),
                select: this.compilationsRender(this.movieCompilations),
                footer: footer.render(),
            });

            handlerLink();
            this.setHandler();

            const {likesBody} = await UserModel.getLikes()
            const likesData = await Promise.resolve(likesBody);
            this.user.setAllLikes(likesData.favorites.id);
            this.user.setHandler();

            header.setHandler();
            this.movieCompilations.forEach((carousel) => {
                carousel.setHandler();
            });


            const selectTopicAll = document.querySelectorAll(".select-title-all");
            selectTopicAll.forEach((val) => {
                val.classList.add("show");
            });
        } catch (err) {
            console.error(err);
        }
    }

    setHandler() {
        const filmsNavbar: HTMLAnchorElement =
            document.querySelector(".font-nav.favourite-js");

        filmsNavbar.style.backgroundColor = "#2C51B1";
        filmsNavbar.style.webkitBackgroundClip = "text";
        filmsNavbar.style.webkitTextFillColor = "transparent";
        filmsNavbar.style.backgroundImage =
            "linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)";

        //
        // const homeNavbarMobile = document.querySelector(".homeMobile-js");
        // const homeNavbar = document.querySelector(".home-js");
        // const nameProfile = document.querySelector(".name-profile-mobile");
        //
        // nameProfile.classList.add("headline-style");
        // homeNavbarMobile.classList.add("headline-style");
        // homeNavbar.classList.add("headline-style");
    }

    compilationsRender(movieCompilations: Array<MovieCompilationModel>) {
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
