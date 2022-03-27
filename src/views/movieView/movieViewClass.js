import movieViewTemplate from './movieView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import {login, movie,movieCompilationMovie} from 'Modules/network';
import UserModel from "../../models/User.js"
import router from "Routing/router.js";
import HeadMovieClass from "Components/headMovie/headMovieClass.js";
import FooterClass from "Components/footer/footerClass.js";
import FirstInfoMovieClass from "Components/firstInfoMovie/firstInfoMovieClass.js";
import SecondGenreClass from "Components/secondGende/secondGenre.js";
import ActorsClass from "Components/actors/actorsClass.js";
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import carousel from 'Components/carousel/carouselClass.js';
import LoaderViewClass from "../loaderView/loaderViewClass.js";

import '../../css/movie.css';

export default class MovieViewClass extends BaseViewClass {
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);

            const [mov,car] = await Promise.all([movie(id),movieCompilationMovie(id)]);



            const {isAuth, body} = await UserModel.auth();
            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            const userData = await Promise.resolve(body);



            const [movieRes,movieCarousel] = await Promise.all([mov.data,car.data]);

            if (movieRes.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);
                return;
            }

            const header = new HeaderClass(userData.user)
            const headMovie = new HeadMovieClass(movieRes);
            const firstInfoMovie = new FirstInfoMovieClass(movieRes);
            const secondGenre = new SecondGenreClass(movieRes.genre);
            const actors = new ActorsClass(movieRes.staff);
            const carouselPop = new carousel('Pop', movieCarousel.movies, 4, movieCarousel.compilation_name);
            const footer = new FooterClass();

            super.render(movieViewTemplate,{
                picture: movieRes.picture,
                header: header.render(),
                headMovie: headMovie.render(),
                firstInfoMovie: firstInfoMovie.render(),
                secondGenre: secondGenre.render(),
                actors: actors.render(),
                carouselPop: carouselPop.render(),
                footer: footer.render()
            });

            handlerLink()
            firstInfoMovie.setHandlers();
            carouselPop.setHandler();
            header.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}
