import movieViewTemplate from './movieView.pug'
import HeaderClass from '../../components/header/headerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import { movie, profile } from '../../modules/network.js';
import router from "../../routing/router.js";
import HeadMovieClass from "../../components/headMovie/headMovieClass.js";
import FooterClass from "../../components/footer/footerClass.js";
import FirstInfoMovieClass from "../../components/firstInfoMovie/firstInfoMovieClass.js";
import SecondGenreClass from "../../components/secondGende/secondGenre.js";
import ActorsClass from "../../components/actors/actorsClass.js";

import '../../css/movie.css';

const ERROR = 500;
const LOGIN_VIEW = '/login';
const ERROR_VIEW = '/error';
const root = document.getElementById('root');

export default class MovieViewClass {
    render() {
        const id = +/\d+/.exec(window.location.pathname);

        Promise.all([profile(), movie(id)])
            .then(([user, movie]) => {
                if (!user.isAuth) {
                    router.go(LOGIN_VIEW);

                    return;
                }
                Promise.all([user.data, movie.data])
                    .then(([userRes, movieRes]) => {
                        if (movieRes.status === ERROR) {
                            router.go(ERROR_VIEW);

                            return;
                        }

                        const header = new HeaderClass(userRes.user.username);
                        const headMovie = new HeadMovieClass(movieRes);
                        const firstInfoMovie = new FirstInfoMovieClass(movieRes);
                        const secondGenre = new SecondGenreClass(movieRes.genre);
                        const actors = new ActorsClass(movieRes.staff);
                        const footer = new FooterClass();

                        root.innerHTML = movieViewTemplate({
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
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }
}
