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
import MovieCompilationView from "Components/movieCompilationView/movieCompilationView"
import UserLikeView from "Components/userLikeView/userLikeView"
import {isEmptyMovies} from "./utilsFavorite"
import "./favorites.scss";
import {User} from "../../types";

export default class FavoritesViewClass extends BaseViewClass {
    private user: UserModel;
    private movieCompilations: Array<MovieCompilationModel>;

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

            const header = new HeaderClass(this.user.userData);

            const {movCompBody}: { movCompBody?: Promise<any> } =
                await MovieCompilationModel.getFavorites();
            const movieCompilationsData = await Promise.resolve(movCompBody);


            if(isEmptyMovies(movieCompilationsData)){
                const empty = "Каталог пуст";
                super.render(homeViewTemplate, {
                    header: header.render(),
                    empty: empty
                });
                const footerImage:HTMLElement = document.querySelector(".footer-poster");
                footerImage.style.position = "absolute";
                footerImage.style.bottom = "0";
            } else {

                movieCompilationsData.forEach((i, id) => {
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


                super.render(homeViewTemplate, {
                    header: header.render(),
                    select: this.compilationsRender(this.movieCompilations),
                });
                this.movieCompilations.forEach((carousel) => {
                    MovieCompilationView.setHandler(carousel.movieCompilationData);
                });
            }

            handlerLink();


            const {likesBody} = await UserModel.getLikes()
            const likesData = await Promise.resolve(likesBody);
            UserLikeView.setAllLikes(likesData.favorites.id);

            this.deleteLikes();
            //this.user.setHandler();
            this.setHandler();
            header.setHandler();



            // const selectTopicAll = document.querySelectorAll(".select-title-all");
            // selectTopicAll.forEach((val) => {
            //     val.classList.add("show");
            // });
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



    }

    deleteLikes(){
        const likes = document.querySelectorAll(".like.active-like");
        likes.forEach(like=>{
            like.addEventListener("click", (e) => {
                const id = like.id.split('_').pop();

                console.log(like.id.split('_').pop());
                const movie = document.getElementById(id);
                movie.style.opacity = "0";
                let formJson = JSON.stringify({
                    id: Number(id),
                });
                UserModel.disliked(formJson);
            });
        })

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
}
