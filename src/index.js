'use strict'
import {FooterClass} from "./components/footer/footerClass.js";
import {HeaderClass} from "./components/header/headerClass.js";
import {CarouselClass} from "./components/carousel/carouselClass.js";

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

    const header = new HeaderClass(root);
    header.items = headerProfile;
    header.render();

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


const Movies = [
    {
        href: "/",
        name: "Звездные войны1",
        genre: "Фантастика1"
    },
    {
        href: "/",
        name: "Звездные войны2",
        genre: "Фантастика2"
    },
    {
        href: "/",
        name: "Звездные войны3",
        genre: "Фантастика3"
    },
    {
        href: "/",
        name: "Звездные войны4",
        genre: "Фантастика4"
    }
];



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

        const btnNext = document.createElement("button");
        btnNext.className = "b-carousel__next js-carousel__next";

        carousel.appendChild(btnPrev);
        carousel.appendChild(btnNext);

        const car = document.createElement("div");
        car.className = "b-carousel__wrap js-carousel__wrap";
        car.style = "transform: translateX(0%);";
        //for (let i = 0; i < 3; i++) {
            const carouse1 = new CarouselClass(car);
            carouse1.items = Movies;
            carouse1.render();
            const carouse2 = new CarouselClass(car);
            carouse2.items = Movies;
            carouse2.render();
      //  }
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

(function () {
    "use strict";

    function Carousel(setting) {
        if (document.querySelector(setting.wrap) === null) {
            console.error(`Carousel not fount selector ${setting.wrap}`);
            return;
        }

        /* Scope privates methods and properties */
        let privates = {};


        /* Public methods */
        // Prev slide
        this.prev_slide = () => {
            --privates.opt.position;

            if (privates.opt.position < 0) {
                privates.sel.wrap.classList.add('s-notransition');
                privates.opt.position = privates.opt.max_position - 1;
            }

            privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
        };


        // Next slide
        this.next_slide = () => {
            ++privates.opt.position;

            if (privates.opt.position >= privates.opt.max_position) {
                privates.opt.position = 0;
            }

            privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
        };


        /* Privates properties */
        privates.setting = setting;

        privates.sel = {
            "main": document.querySelector(privates.setting.main),
            "wrap": document.querySelector(privates.setting.wrap),
            "children": document.querySelector(privates.setting.wrap).children,
            "prev": document.querySelector(privates.setting.prev),
            "next": document.querySelector(privates.setting.next)
        };

        privates.opt = {
            "position": 0,
            "max_position": document.querySelector(privates.setting.wrap).children.length
        };

        // Control
        if (privates.sel.prev !== null) {
            privates.sel.prev.addEventListener('click', () => {
                this.prev_slide();
            });
        }

        if (privates.sel.next !== null) {
            privates.sel.next.addEventListener('click', () => {
                this.next_slide();
            });
        }

    }


    let a = new Carousel({
        "main": ".js-carousel",
        "wrap": ".js-carousel__wrap",
        "prev": ".js-carousel__prev",
        "next": ".js-carousel__next"
    });

})();

