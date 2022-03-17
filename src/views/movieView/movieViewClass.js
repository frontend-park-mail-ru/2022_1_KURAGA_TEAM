import movieViewTemplate from './movieView.pug'
import HeaderClass from '../../components/header/headerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import { profile } from '../../modules/network.js';
import router from "../../routing/router.js";
import HeadMovieClass from "../../components/headMovie/headMovie.js";
import FooterClass from "../../components/footer/footerClass.js";

const root = document.getElementById('root');

export default class MovieViewClass {
    render() {
        // profile()
        //     .then(({ isAuth, data }) => {
        //         if (!isAuth) {
        //             router.go('login');
        //             return;
        //         }
        //         data.then((res) => {
                    const header = new HeaderClass("res.username");
                    const headMovie = new HeadMovieClass();
                    const footer = new FooterClass();

                    root.innerHTML = movieViewTemplate({
                        header: header.render(),
                        headMovie: headMovie.render(),
                        footer: footer.render()
                    });

                    handlerLink()
                    header.setHandler();
            //     })
            // })
            // .catch((err) => {
            //     console.error(err);
            // })
    }
}
