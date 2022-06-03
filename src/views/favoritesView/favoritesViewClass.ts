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
    private likes = {"Фильмы": new Set, "Сериалы": new Set};

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


            if (isEmptyMovies(movCompBody)) {
                const empty = "Ваш каталог пустой";
                super.render(homeViewTemplate, {
                    header: header.render(),
                    empty: empty
                });
                const autoBind = new AutoBind(".favorite")
                const root: HTMLElement = document.querySelector(".root");
                root.classList.add("root-correction");
                const footerImage: HTMLElement = document.querySelector(".footer-poster");
                // autoBind.setVariableStyle("marginTextFavorite","0");
                footerImage.classList.add("footer-poster-fixed");
            } else {

                movCompBody.forEach((i, id) => {
                    if (!i.movies) {
                        movCompBody.splice(id, 1);
                    }
                })
                movCompBody.forEach((item, index) => {
                    item.movies.forEach(movie => {
                        if (index == 0) {
                            this.likes["Фильмы"].add(movie.id);
                        } else this.likes["Сериалы"].add(movie.id);

                    })
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

                if (document.querySelector(".root").classList.contains("root-correction")) {
                    document.querySelector(".root").classList.remove("root-correction");
                }
                const autoBind = new AutoBind(".favorite")
                autoBind.setVariableStyle("marginTextFavorite", "10vw");
                const footerImage: HTMLElement = document.querySelector(".footer-poster");

                if (movCompBody.length == 1) {
                    const footerImage: HTMLElement = document.querySelector(".footer-poster");
                    footerImage.classList.add("footer-poster-fixed");
                }

                this.movieCompilations.forEach((carousel) => {
                    MovieCompilationView.setHandler(carousel.movieCompilationData);
                });
            }

            handlerLink();


            const {likesData} = await UserModel.getLikes()

            UserLikeView.setAllLikes(likesData.favorites.id);

            this.deleteLikes(movCompBody.length);
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

    async deleteLikes(length: number) {
        const autoBind = new AutoBind(".selection");

        const likes = document.querySelectorAll(".like.active-like");

        likes.forEach(like => {
            const id = like.id.split('_').pop();
            autoBind.setVariableEvent("dislike" + id, () => {
                const movie = document.getElementById(id);
                autoBind.setVariable("hiddenMovie" + id, true);
                for (let key in this.likes) {
                    if (this.likes[key].has(Number(id))) {
                        this.likes[key].delete(Number(id));
                    }
                    if (this.likes[key].size == 0) {

                        const footerImage: HTMLElement = document.querySelector(".footer-poster");
                        footerImage.classList.add("footer-poster-fixed");

                        document.querySelectorAll(".select-title").forEach((i: HTMLElement) => {
                            if (i.textContent == key) {
                                i.style.visibility = "hidden";
                            }
                            if(i.textContent == "Фильмы"){
                                const topic:HTMLElement = document.querySelector(".select-topic");
                                topic.style.display = "none";
                            }
                        })

                    }
                }
                let formJson = JSON.stringify({
                    id: id,
                });
                UserModel.disliked(formJson);
            })


            // if (this.likes["0"].size == 0 || this.likes["1"].size == 0) {
            //
            //     document.querySelectorAll(".select-title").forEach((i: HTMLElement) => {
            //
            //     })
            // }


            // like.addEventListener("click", ()=>{
            // });
            //autoBind.setVariableEvent("dislike"+id,()=>{});
            // like.removeEventListener("click", ()=>{
            //
            //     const id = like.id.split('_').pop();
            //
            //     console.log(like.id.split('_').pop());
            //     const movie = document.getElementById(id);
            //     movie.classList.add("hidden");
            //
            //     let formJson = JSON.stringify({
            //         id: Number(id),
            //     });
            //     UserModel.disliked(formJson);
            // });
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


    unmount() {
        if (this.movieCompilations) {
            this.movieCompilations.forEach((carousel) => {
                MovieCompilationView.unmount(carousel.movieCompilationData);
            });
        }
    }
}
