import homeViewTemplate from "./homeView.js";
import {HeaderClass} from "../header/headerClass.js";
import {MainMovieClass} from "../mainMovie/mainMovieClass.js";
import {CarouselPopClass} from "../carousel/carouselPop/carouselPopClass.js"
import {CarouselTopClass} from "../carousel/carouselTop/carouselTopClass.js"
import {CarouselFamClass} from "../carousel/carouselFam/carouselFamClass.js"
//import {FooterClass} from "../footer/footerClass.js";

const root = document.getElementById("root");


export class HomeViewClass {
    render() {
        const header = new HeaderClass();
        const mainMovie = new MainMovieClass();
        const carouselPop = new CarouselPopClass();
        const carouselTop = new CarouselTopClass();
        const carouselFam = new CarouselFamClass();
        // const footer = new FooterClass();

        root.innerHTML = homeViewTemplate({
            header: header.render(),
            mainMovie: mainMovie.render(),
            carouselPop: carouselPop.render(),
            carouselTop: carouselTop.render(),
            carouselFam: carouselFam.render()
            //footer: footer.render()});
        });
        carouselPop.setHandler();
        carouselTop.setHandler();
        carouselFam.setHandler();
    }

}

