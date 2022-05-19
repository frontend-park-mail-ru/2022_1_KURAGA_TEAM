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
import MovieCompilationView from "../movieCompilationView/movieCompilationView"
import UserLikeView from "../userLikeView/userLikeView"
import {isEmptyMovies} from "./utilsFavorite"
import AutoBind from "Utils/autoBind"
import "./favorites.scss";
import {User} from "../../types";

export default class FavoritesViewClass extends BaseViewClass {
    private user: UserModel;
    private movieCompilations: Array<MovieCompilationModel> = null;
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

            const header = new HeaderClass(this.user.userData);

            const {movCompBody} = await MovieCompilationModel.getFavorites();

            const autoBind = new AutoBind;

            if (isEmptyMovies(movCompBody)) {
                const empty = "Ваш каталог пустой";
                super.render(homeViewTemplate, {
                    header: header.render(),
                    empty: empty
                });

                const footerImage: HTMLElement = document.querySelector(".footer-poster");
                footerImage.classList.add("footer-poster-position");
            } else {

                movCompBody.forEach((i, id) => {
                    if (!i.movies) {
                        movCompBody.splice(id, 1);
                    }
                })

                this.movieCompilations = movCompBody.map(
                    (movieCompilationData, index) =>
                        new MovieCompilationModel(
                            index,
                            movieCompilationData,
                        )
                );


                super.render(homeViewTemplate, {
                    header: header.render(),
                    select: this.compilationsRender(this.movieCompilations),
                });

                if (movCompBody.length == 1) {
                    const footerImage: HTMLElement = document.querySelector(".footer-poster");
                    footerImage.classList.add(".footer-poster-position");
                }

                this.movieCompilations.forEach((carousel) => {
                    MovieCompilationView.setHandler(carousel.movieCompilationData);
                });
            }

            handlerLink();


            const {likesData} = await UserModel.getLikes()
            console.log(likesData);
            UserLikeView.setAllLikes(likesData.favorites.id);

            UserLikeView.deleteLikes();
            this.setHandler();
            header.setHandler();

        } catch (err) {
            console.error(err);
        }
    }

    setHandler() {
        const favouriteNavbar: HTMLAnchorElement = document.querySelector(".font-nav.favourite-js");
        const favouriteMobileNavbar: HTMLAnchorElement = document.querySelector(".menu-mobile__nav.favourite-js");

        favouriteNavbar.classList.add("headline-style");
        favouriteMobileNavbar.classList.add("headline-style");
    }



    compilationsRender(movieCompilations: Array<MovieCompilationModel>) {
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
