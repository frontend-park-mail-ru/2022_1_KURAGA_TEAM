import homeViewTemplate from './homeView.pug';
import HeaderClass from 'Components/header/headerClass.js';
import MainMovieClass from 'Components/mainMovie/mainMovieClass.js';
import carousel from 'Components/carousel/carouselClass.js';
import FooterClass from 'Components/footer/footerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import {movies} from 'Modules/network';
import router from 'Routing/router.js';
import BaseViewClass from '../baseView/baseViewClass.js';
import {routes} from "Routing/constRouting";
import LoaderViewClass from "../loaderView/loaderViewClass.js";
import UserModel from "../../models/User.js"
import MovieModel from "../../models/Movie.js"
import '../../css/home.css';


export default class HomeViewClass extends BaseViewClass {
    #user;
    #mainMovie;

    async render() {

        try {
            const loader = new LoaderViewClass();
            loader.render();

            const {isAuth, userBody} = await UserModel.auth();
            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            const userData = await Promise.resolve(userBody);
            this.#user = new UserModel(userData.user);


            const {movBody} = await MovieModel.mainMov();
            const mainMovieData = await Promise.resolve(movBody);
            this.#mainMovie = new MovieModel(mainMovieData);


            
            const [movie] = await Promise.all([movies()]);
            const [movieInfo] = await Promise.all([movie.data])

            const header = new HeaderClass(this.#user.userData);
            const mainMovie = new MainMovieClass(this.#mainMovie.movieData);
            const carouselPop = new carousel('Pop', movieInfo[0].movies, 4, movieInfo[0].compilation_name);
            const carouselTop = new carousel('Top', movieInfo[1].movies, 3, movieInfo[1].compilation_name);
            const carouselFam = new carousel('Fam', movieInfo[2].movies, 4, movieInfo[2].compilation_name);
            const footer = new FooterClass();

            super.render(homeViewTemplate, {
                mainMovieImg: this.#mainMovie.movieData,
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
        } catch (err) {
            console.error(err);
        }
    }
}
