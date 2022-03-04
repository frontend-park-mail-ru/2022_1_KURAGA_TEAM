'use strict'
import {FooterClass} from "./components/footer/footerClass.js";
import {HeaderClass} from "./components/header/headerClass.js";
import {CarouselClass} from "./components/carousel/carouselClass.js";
import {MainMovieClass} from "./components/mainMovie/mainMovieClass.js";
const root = document.getElementById('root');


function createPage() {

    createHeader();
    createMain();
    createFooter();
}


const configProfile = {
    telegram: {
        href: "/",
        src: "../../static/profile.png",
    }
};

const headerProfile = Object.entries(configProfile).map(([key, {href, src}]) => ({key, href, src}));

function createHeader() {

    const header = document.createElement("div");
    header.className = "header";

    const h = new HeaderClass(header);
    h.items = headerProfile;
    h.render();

    const m = new MainMovieClass(header);
    m.items = headerProfile;
    m.render();
    
    root.appendChild(header);

    /* const firstRow = document.createElement("div");
     firstRow.className = "header"

     const header = document.createElement("div");
     header.className = "navbar font";

     const logo = document.createElement("object");
     logo.classList.add("logo");
     logo.type = "image/png";
     logo.data = "../static/logo.png";
     header.appendChild(logo);
     let headerStr = ["Главная", "Фильмы", "Сериалы", "Избранное"]
     headerStr.forEach((str) => {
         const refT = document.createElement("a");
         refT.className = "label font";
         refT.href = "/";
         refT.textContent = str;
         header.appendChild(refT)

     });


     const space = document.createElement("div");
     space.classList.add("space");
     header.appendChild(space);

     const search = document.createElement("object");
     search.classList.add("searchBtn");
     search.type = "image/png";
     search.data = "../static/lupa.png";
     header.appendChild(search);


     const profile = document.createElement("div");
     profile.classList.add("profile");
     const profileImg = document.createElement("img");
     profileImg.classList = "profileImg";
     profileImg.src = "../static/profile.png";
     profile.appendChild(profileImg);
     header.appendChild(profile);
     firstRow.appendChild(header);


     const mainMovie = document.createElement("div");
     mainMovie.className = "mainMovie";
     const descr = document.createElement("div");
     descr.className = "sidebar";
     const title = document.createElement("div");
     title.className = "font title";

     const titleName = document.createElement("div");
     titleName.classList.add("titleName");
     titleName.textContent = "1+1";
     title.appendChild(titleName);

     const titleDescr = document.createElement("div");
     titleDescr.classList.add("titleDescr");
     titleDescr.textContent = "«Sometimes you have to reach into someone else\'s world to find out what\'s missing in your own»";
     title.appendChild(titleDescr);


     const btn = document.createElement("div")
     btn.className = "btn"
     btn.action = ".";
     const refBtn = document.createElement("a");
     refBtn.className = "fontOther";
     refBtn.href = "/";
     refBtn.textContent = "Смотреть онлайн";
     btn.appendChild(refBtn)

     const btnInfo = document.createElement("div")
     btnInfo.className = "btnInfo"
     btnInfo.action = ".";
     const refBtnInfo = document.createElement("a");
     refBtnInfo.className = "fontOther";
     refBtnInfo.href = "/";
     refBtnInfo.textContent = "О фильме";
     btnInfo.appendChild(refBtnInfo)

     descr.appendChild(title)
     descr.appendChild(btn)
     descr.appendChild(btnInfo)

     mainMovie.appendChild(descr)
     firstRow.appendChild(mainMovie)
     root.appendChild(firstRow)*/
}





function createMain() {

// подборки
    const selection = document.createElement("div");
    selection.className = "selection";
    let MovieName = ["Популярное", "Лучшее за 2021", "Семейное"];

    MovieName.forEach((str) => {

        const select = document.createElement("div");
        select.className = "select font";

        const selectTitle = document.createElement("div");
        selectTitle.classList.add("selectTitle");
        selectTitle.textContent = str;
        select.appendChild(selectTitle);


        const wrap = document.createElement("div");
        wrap.classList.add("wrap");

        const carousel = document.createElement("div");
        carousel.className = "b-carousel js-carousel";

        const btnPrev = document.createElement("button");
        btnPrev.className = "b-carousel__prev js-carousel__prev";
        btnPrev.textContent = "❬";

        const btnNext = document.createElement("button");
        btnNext.className = "b-carousel__next js-carousel__next";
        btnNext.textContent = "❭";

        carousel.appendChild(btnPrev);
        carousel.appendChild(btnNext);

        const car = document.createElement("div");
        car.className = "b-carousel__wrap js-carousel__wrap";
        car.style = "transform: translateX(0%);";


        for (let i = 0; i < 3; i++) {
            const carouselItem = document.createElement("div");
            carouselItem.className = "b-carousel__item";

            const carouse = new CarouselClass(carouselItem);
            carouse.items = Movies;
            carouse.render();
            car.appendChild(carouselItem);

        }
        carousel.appendChild(car);
        wrap.appendChild(carousel);

        /* const carousel = new CarouselClass(select);
         carousel.items = Movies;
         carousel.render();*/


        /*const selectMovie = document.createElement("div");
        selectMovie.className = "selectMovies section";

        for (let i = 0; i < 5; i++) {

            const movie = document.createElement("div");
            movie.className = "movie";
            const refMov = document.createElement("a");
            refMov.href = "/"
            const hrefMov = document.createElement("div");
            hrefMov.className = "refmov";
            const desMov = document.createElement("div");
            desMov.className = "descMov";

            const titleMovie = document.createElement("div");
            titleMovie.textContent = "Звёздные войны";
            desMov.appendChild(titleMovie);

            const genre = document.createElement("div");
            genre.className = "genre font";
            genre.textContent = "Фантастика";
            desMov.appendChild(genre);

            const like = document.createElement("input");
            like.type = "checkbox";
            like.id = "cb";
            desMov.appendChild(like);


            refMov.appendChild(hrefMov)
            movie.appendChild(refMov)
            movie.appendChild(desMov)
            selectMovie.appendChild(movie)
            select.appendChild(selectMovie)
        }*/
        select.appendChild(wrap);
        selection.appendChild(select);
        root.appendChild(selection)

    });


}


const configIcon = {
    telegram: {
        href: "/",
        src: "../../static/telegram.png",
    },
    instagram: {
        href: "https://www.instagram.com/danyatarnovskiy/",
        src: "../../static/insta.png",
    },
    vk: {
        href: "https://vk.com/dtarnovsky",
        src: "../../static/vk.png",
    }
};

const footerIcons = Object.entries(configIcon).map(([key, {href, src}]) => ({key, href, src}));

function createFooter() {
    const f = document.createElement("div");
    f.className = "item-c"

    const footer = new FooterClass(f);
    footer.items = footerIcons;
    footer.render();
    root.appendChild(f);

}


createPage();





