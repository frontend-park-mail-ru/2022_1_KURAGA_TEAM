import movieViewTemplate from './movieView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import {login, movie, profile,movieCompilationMovie} from 'Modules/network';
import router from "Routing/router.js";
import HeadMovieClass from "Components/headMovie/headMovieClass.js";
import FooterClass from "Components/footer/footerClass.js";
import FirstInfoMovieClass from "Components/firstInfoMovie/firstInfoMovieClass.js";
import SecondGenreClass from "Components/secondGende/secondGenre.js";
import ActorsClass from "Components/actors/actorsClass.js";
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import carousel from 'Components/carousel/carouselClass.js';

import '../../css/movie.css';


export default class MovieViewClass extends BaseViewClass {
    async render() {
        try {
            const id = +/\d+/.exec(window.location.pathname);

            const [user, mov,car] = await Promise.all([profile(), movie(id),movieCompilationMovie(id)]);

            if (!user.isAuth) {
                router.go(routes.LOGIN_VIEW);

                return;
            }

            const [userRes, movieRes,movieCarousel] = await Promise.all([user.data, mov.data,car.data]);

            if (movieRes.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);
                return;
            }
            console.log(movieRes);
            const header = new HeaderClass(userRes.user);
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
