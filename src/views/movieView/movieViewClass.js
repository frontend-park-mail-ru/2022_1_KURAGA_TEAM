import movieViewTemplate from './movieView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import {movieCompilationMovie} from 'Modules/network';
import UserModel from "../../models/User.js"
import MovieModel from "../../models/Movie.js"
import router from "Routing/router.js";
import HeadMovieClass from "Components/headMovie/headMovieClass.js";
import FooterClass from "Components/footer/footerClass.js";
import FirstInfoMovieClass from "Components/firstInfoMovie/firstInfoMovieClass.js";
import SecondGenreClass from "Components/secondGende/secondGenre.js";
import ActorsClass from "Components/actors/actorsClass.js";
import {routes} from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import carousel from 'Components/carousel/carouselClass.js';
import LoaderViewClass from "../loaderView/loaderViewClass.js";

import '../../css/movie.css';

export default class MovieViewClass extends BaseViewClass {
    #user;
    #movie;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);

            const [car] = await Promise.all([movieCompilationMovie(id)]);


            const {isAuth, userBody} = await UserModel.auth();
            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }


            const userData = await Promise.resolve(userBody);
            this.#user = new UserModel(userData.user);


            const {movBody} = await MovieModel.getMovie(id);
            console.log(movBody);
            const movData = await Promise.resolve(movBody);
            console.log(movData);
            this.#movie = new MovieModel(movData);


            // if (movieRes.status === routes.ERROR) {
            //     router.go(routes.ERROR_VIEW);
            //     return;
            // }


            const [movieCarousel] = await Promise.all([car.data]);


            const header = new HeaderClass(this.#user.userData);
            const headMovie = new HeadMovieClass(this.#movie.movieData);
            const firstInfoMovie = new FirstInfoMovieClass(this.#movie.movieData);
            const secondGenre = new SecondGenreClass(this.#movie.movieData);
            const actors = new ActorsClass(this.#movie.movieData);
            const carouselPop = new carousel('Pop', movieCarousel.movies, 4, movieCarousel.compilation_name);
            const footer = new FooterClass();

            super.render(movieViewTemplate, {
                movieImg: this.#movie.movieData,
                header: header.render(),
                headMovie: headMovie.render(),
                firstInfoMovie: firstInfoMovie.render(),
                secondGenre: secondGenre.render(),
                actors: actors.render(),
                carouselPop: carouselPop.render(),
                footer: footer.render()
            });

            handlerLink()
            //firstInfoMovie.setHandlers();
            carouselPop.setHandler();
            header.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}
