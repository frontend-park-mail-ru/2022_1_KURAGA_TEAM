import homeViewTemplate from './homeView.pug';
import HeaderClass from 'Components/header/headerClass.js';
import MainMovieClass from 'Components/mainMovie/mainMovieClass.js';
import Carousel from 'Components/carousel/carouselClass.js';
import FooterClass from 'Components/footer/footerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import router from 'Routing/router.js';
import BaseViewClass from '../baseView/baseViewClass.js';
import { routes } from "Routing/constRouting";
import LoaderViewClass from "../loaderView/loaderViewClass.js";
import UserModel from "../../models/User.js"
import MovieModel from "../../models/Movie.js"
import MovieCompilationModel from "../../models/MovieCompilation"

import '../../css/home.scss';

export default class HomeViewClass extends BaseViewClass {
    #user;
    #mainMovie;
    #movieCompilations = [];

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

            const {movCompBody} = await MovieCompilationModel.getMovieCompilations();
            const movieCompilationsData = await Promise.resolve(movCompBody);
            movieCompilationsData.forEach((movieCompilationData) => {
                this.#movieCompilations.push(new MovieCompilationModel(movieCompilationData))
            });

            const header = new HeaderClass(this.#user.userData);
            const mainMovie = new MainMovieClass(this.#mainMovie.movieData);
            const carousels = [];
            const carouselsMobile = [];
            this.#movieCompilations.forEach((movieCompilation, index) => {
                carousels.push(new Carousel(index, movieCompilation.movieCompilationData,false));
                carouselsMobile.push(new Carousel(index, movieCompilation.movieCompilationData,true));
            });

            console.log(carousels);
            const footer = new FooterClass();

            super.render(homeViewTemplate, {
                mainMovieImg: this.#mainMovie.movieData,
                header: header.render(),
                mainMovie: mainMovie.render(),
                carouselPop: carousels[0].render(),
                carouselTop: carousels[1].render(),
                carouselAct: carousels[2].render(),
                carouselFam: carousels[3].render(),
                carouselPopMobile: carouselsMobile[0].render(),
                carouselTopMobile: carouselsMobile[1].render(),
                carouselActMobile: carouselsMobile[2].render(),
                carouselFamMobile: carouselsMobile[3].render(),
                footer: footer.render(),
            });
            console.log(carouselsMobile[2]);

            handlerLink();
            this.setHandler();

            header.setHandler();
            carousels.forEach((carousel) => {
                carousel.setHandler();
            });
            carouselsMobile.forEach((carousel) => {
                carousel.setHandler();
            });
        } catch (err) {
            console.error(err);
        }
    }

    setHandler() {
        const homeNavbarMobile = document.querySelector('.homeMobile-js');
        const homeNavbar = document.querySelector('.home-js');
        const nameProfile = document.querySelector('.name-profile-mobile');


        nameProfile.classList.add("headline-style");
        homeNavbarMobile.classList.add("headline-style");
        homeNavbar.classList.add("headline-style");
    }
}
