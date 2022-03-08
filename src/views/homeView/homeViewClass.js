import homeViewTemplate from './homeView.js';
import HeaderClass from '../../components/header/headerClass.js';
import MainMovieClass from '../../components/mainMovie/mainMovieClass.js';
import carousel from '../../components/carousel/carouselClass.js';
import FooterClass from '../../components/footer/footerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import { profile } from '../../modules/network.js';
import router from '../../routing/router.js';

const root = document.getElementById('root');

export default class HomeViewClass {
    render() {
        profile()
            .then(({ isAuth, data }) => {
                if (!isAuth) {
                    router.go('/login');

                    return;
                }
                console.log(isAuth);

                const header = new HeaderClass();
                const mainMovie = new MainMovieClass();
                const carouselPop = new carousel(3, 3, 'Pop');
                const carouselTop = new carousel(3, 3, 'Top');
                const carouselFam = new carousel(3, 3, 'Fam');
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
                carouselPop.setHandler();
                carouselTop.setHandler();
                carouselFam.setHandler();
                header.setHandler();
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
