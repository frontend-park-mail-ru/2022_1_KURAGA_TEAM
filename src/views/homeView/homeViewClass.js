import homeViewTemplate from './homeView.pug';
import HeaderClass from '../../components/header/headerClass.js';
import MainMovieClass from '../../components/mainMovie/mainMovieClass.js';
import carousel from '../../components/carousel/carouselClass.js';
import FooterClass from '../../components/footer/footerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import {profile, movies} from '../../modules/network.js';
import router from '../../routing/router.js';

const root = document.getElementById('root');

export default class HomeViewClass {
    render() {

        Promise.all([profile(), movies()])
            .then(([user, movies]) => {
                if (!user.isAuth) {
                    router.go('/login');
                    return;
                }
                Promise.all([user.data, movies.data])
                    .then(([user, mov]) => {
                        const header = new HeaderClass(user.username);
                        const mainMovie = new MainMovieClass();
                        const carouselPop = new carousel('Pop', mov.moviesCompilation[0].movies, 3);
                        const carouselTop = new carousel('Top', mov.moviesCompilation[1].movies, 3);
                        const carouselFam = new carousel('Fam', mov.moviesCompilation[2].movies, 2);
                        const footer = new FooterClass();

                        root.innerHTML = homeViewTemplate({
                            header: header.render(),
                            mainMovie: mainMovie.render(),
                            carouselPop: carouselPop.render(),
                            carouselTop: carouselTop.render(),
                            carouselFam: carouselFam.render(),
                            footer: footer.render(),
                        });
                        handlerLink();
                        header.setHandler();
                        carouselPop.setHandler();
                        carouselTop.setHandler();
                        carouselFam.setHandler();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
