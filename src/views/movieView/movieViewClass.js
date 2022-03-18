import movieViewTemplate from './movieView.pug'
import HeaderClass from '../../components/header/headerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import {movie, profile} from '../../modules/network.js';
import router from "../../routing/router.js";
import HeadMovieClass from "../../components/headMovie/headMovieClass.js";
import FooterClass from "../../components/footer/footerClass.js";
import FirstInfoMovieClass from "../../components/firstInfoMovie/firstInfoMovieClass.js";
import SecondGenreClass from "../../components/secondGende/secondGenre.js";
import ActorsClass from "../../components/actors/actorsClass.js";

const root = document.getElementById('root');

export default class MovieViewClass {
    render() {
        let id = document.location.pathname.slice(7);

        Promise.all([profile(), movie(id)])
            .then(([user, movie]) => {
                if (!user.isAuth) {
                    router.go('/login');

                    return;
                }
                Promise.all([user.data, movie.data])
                    .then(([userRes, movieRes]) => {
                        if (movieRes.status === 500) {
                            router.go('/error');

                            return;
                        }

                        const header = new HeaderClass(userRes.username);
                        const headMovie = new HeadMovieClass(movieRes.year, movieRes.genre, movieRes.country,
                            movieRes.duration, movieRes.age_limit, movieRes.rating, movieRes.kinopoisk_rating);
                        const firstInfoMovie = new FirstInfoMovieClass(movieRes.rating, movieRes.description);
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
