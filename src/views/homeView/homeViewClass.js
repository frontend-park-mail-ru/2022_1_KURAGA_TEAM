import homeViewTemplate from './homeView.pug';
import HeaderClass from 'Components/header/headerClass.js';
import MainMovieClass from 'Components/mainMovie/mainMovieClass.js';
import Carousel from 'Components/carousel/carouselClass.js';
import FooterClass from 'Components/footer/footerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import router from 'Routing/router.js';
import BaseViewClass from '../baseView/baseViewClass.js';
import {routes} from "Routing/constRouting";
import LoaderViewClass from "../loaderView/loaderViewClass.js";
import UserModel from "../../models/User.js"
import MovieModel from "../../models/Movie.js"
import MovieCompilationModel from "../../models/MovieCompilation"
import '../../css/home.css';
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

            const { movBody } = await MovieModel.mainMov();
            const mainMovieData = await Promise.resolve(movBody);
            this.#mainMovie = new MovieModel(mainMovieData);

            const {movCompBody} = await MovieCompilationModel.getMovieCompilations();
            const movieCompilationsData = await Promise.resolve(movCompBody);
            movieCompilationsData.forEach((movieCompilationData) => {
                this.#movieCompilations.push(new MovieCompilationModel(movieCompilationData))
            });

            const header = new HeaderClass(this.#user.userData);
            const mainMovie = new MainMovieClass(this.#mainMovie.movieData);
            // const carousels = [];
            // this.#movieCompilations.forEach((movieCompilation, index) => {
            //     carousels.push(new Carousel(index, movieCompilation.movieCompilationData));
            // });
            const carouselPop = new Carousel("Pop", this.#movieCompilations[0].movieCompilationData);
            const carouselTop = new Carousel("Top", this.#movieCompilations[1].movieCompilationData);
            const carouselFam = new Carousel("Fam", this.#movieCompilations[2].movieCompilationData);
            const carouselPopMobile = new Carousel("MobilePop",this.#movieCompilations[0].movieCompilationData);
            const carouselTopMobile = new Carousel("MobileTop", this.#movieCompilations[1].movieCompilationData);
            const carouselFamMobile = new Carousel("MobileFam", this.#movieCompilations[2].movieCompilationData);
            const footer = new FooterClass();

            super.render(homeViewTemplate, {
                mainMovieImg: this.#mainMovie.movieData,
                header: header.render(),
                mainMovie: mainMovie.render(),
                carouselPop: carouselPop.render(),
                carouselTop: carouselTop.render(),
                carouselFam: carouselFam.render(),
                carouselPopMobile: carouselPopMobile.render(),
                carouselTopMobile: carouselTopMobile.render(),
                carouselFamMobile: carouselFamMobile.render(),
                footer: footer.render(),
            });

            handlerLink();
            this.setHandler();
            header.setHandler();
            carouselPop.setHandler();
            carouselTop.setHandler();
            carouselFam.setHandler();
            carouselPopMobile.setHandler();
            carouselTopMobile.setHandler();
            carouselFamMobile.setHandler();
        } catch (err) {
            console.error(err);
        }
    }

    setHandler() {
        const homeNavbarMobile = document.querySelector('.homeMobile-js');
        const homeNavbar = document.querySelector('.home-js');

        homeNavbarMobile.style.backgroundColor = '#2C51B1';
        homeNavbarMobile.style.webkitBackgroundClip = 'text';
        homeNavbarMobile.style.webkitTextFillColor = 'transparent';
        homeNavbarMobile.style.backgroundImage = 'linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)';
        homeNavbar.style.backgroundColor = '#2C51B1';
        homeNavbar.style.webkitBackgroundClip = 'text';
        homeNavbar.style.webkitTextFillColor = 'transparent';
        homeNavbar.style.backgroundImage = 'linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)';
    }
}
