import homeViewTemplate from "./homeView.js";
import {HeaderClass} from "../../components/header/headerClass.js";
import {MainMovieClass} from "../../components/mainMovie/mainMovieClass.js";
import {CarouselPopClass} from "../../components/carousel/carouselPop/carouselPopClass.js"
import {CarouselTopClass} from "../../components/carousel/carouselTop/carouselTopClass.js"
import {CarouselFamClass} from "../../components/carousel/carouselFam/carouselFamClass.js"
import {FooterClass} from "../../components/footer/footerClass.js";
//import {UserModel} from "../../models/User.js";
const root = document.getElementById("root");

export class HomeViewClass {
    render() {
        //const user = UserModel.getUser();
        // const films =FilmListModel.getFilms();


        const header = new HeaderClass();
        const mainMovie = new MainMovieClass();
        const carouselPop = new CarouselPopClass();
        const carouselTop = new CarouselTopClass();
        const carouselFam = new CarouselFamClass();
        const footer = new FooterClass();

        root.innerHTML = homeViewTemplate({
            header: header.render(),
            mainMovie: mainMovie.render(),
            carouselPop: carouselPop.render(),
            carouselTop: carouselTop.render(),
            carouselFam: carouselFam.render(),
            footer: footer.render()
        });
        carouselPop.setHandler();
        carouselTop.setHandler();
        carouselFam.setHandler();
    }

    setHandler() {

        Array.from(document.getElementsByTagName('a')).forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                router.go(item.pathname);
            })
        });


        const quit = document.querySelector('.btn-info');
        quit.addEventListener('click', (e) => {
            console.log("drdrgdrg");
            e.preventDefault();

            logout(form)
                .then(({status, responseBody}) => {
                    if (Number(status) / 100 === 4) {

                    } else {
                        console("moove");
                        router.go("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                })

        });

    }

}

