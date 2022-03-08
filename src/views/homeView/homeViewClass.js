import homeViewTemplate from "./homeView.js";
import {HeaderClass} from "../../components/header/headerClass.js";
import {MainMovieClass} from "../../components/mainMovie/mainMovieClass.js";
import {carousel} from "../../components/carousel/carouselClass.js"
import {FooterClass} from "../../components/footer/footerClass.js";
import {setHandler} from "../../utils/handlerLink.js";
import {profile} from "../../modules/network.js";
import router from "../../routing/router.js"

const root = document.getElementById("root");

export class HomeViewClass {
    render() {

        const header = new HeaderClass();
        const mainMovie = new MainMovieClass();
        const carouselPop = new carousel(3,3,"Pop");
        const carouselTop = new carousel(3,3,"Top");
        const carouselFam = new carousel(3,3,"Fam");
        const footer = new FooterClass();

        root.innerHTML = homeViewTemplate({
            header: header.render(),
            mainMovie: mainMovie.render(),
            carouselPop: carouselPop.render(),
            carouselTop: carouselTop.render(),
            carouselFam: carouselFam.render(),
            footer: footer.render()
        });
        this.handler();
        setHandler();
        carouselPop.setHandler();
        carouselTop.setHandler();
        carouselFam.setHandler();
        header.setHandler();
    }

    handler(){
        profile()
            .then(({status, responseBody}) => {
                if (Number(status) / 100 === 4) {
                    router.go("/login");
                } else {

                }
            })
            .catch((err) => {
                console.error(err);
            })
    }




}

