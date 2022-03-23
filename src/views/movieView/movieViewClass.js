import movieViewTemplate from './movieView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import {login, movie, profile} from 'Modules/network';
import router from "Routing/router.js";
import HeadMovieClass from "Components/headMovie/headMovieClass.js";
import FooterClass from "Components/footer/footerClass.js";
import FirstInfoMovieClass from "Components/firstInfoMovie/firstInfoMovieClass.js";
import SecondGenreClass from "Components/secondGende/secondGenre.js";
import ActorsClass from "Components/actors/actorsClass.js";
import { routes } from "Routing/constRouting";

import '../../css/movie.css';

const root = document.getElementById('root');

export default class MovieViewClass {
    async render() {
        try {
            const id = +/\d+/.exec(window.location.pathname);

            const [user, mov] = await Promise.all([profile(), movie(id)]);

            if (!user.isAuth) {
                router.go(routes.LOGIN_VIEW);

                return;
            }

            const [userRes, movieRes] = await Promise.all([user.data, mov.data]);

            if (movieRes.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);

                return;
            }

            console.log(movieRes)
            const header = new HeaderClass(userRes.user);
            const headMovie = new HeadMovieClass(movieRes);
            const firstInfoMovie = new FirstInfoMovieClass(movieRes);
            const secondGenre = new SecondGenreClass(movieRes.genre);
            const actors = new ActorsClass(movieRes.staff);
            const footer = new FooterClass();

            root.innerHTML = movieViewTemplate({
                picture: movieRes.picture,
                header: header.render(),
                headMovie: headMovie.render(),
                firstInfoMovie: firstInfoMovie.render(),
                secondGenre: secondGenre.render(),
                actors: actors.render(),
                footer: footer.render()
            });

            handlerLink()
            firstInfoMovie.setHandlers();
            header.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}
