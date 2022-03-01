'use strict'
import {FooterClass} from "./components/footer/footerClass.js";
const root = document.getElementById('root');



function createPage() {

    createHeader();
    createMain();
    createFooter();
}

function createHeader() {
    const firstRow = document.createElement("div");
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
    root.appendChild(firstRow)
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
        const selectMovie = document.createElement("div");
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
        }

        selection.appendChild(select)
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

function createFooter(){
    const f = document.createElement("div");
    f.className = "item-c"

    const footer = new FooterClass(f);
    footer.items = footerIcons;
    footer.render();

}
// футер
// const f = document.createElement("div");
// f.className = "item-с";
// const footer = document.createElement("footer");
// footer.id = "footer";
// f.appendChild(footer);
//
// const firstFooter = document.createElement("div");
// firstFooter.id = "first-footer";
// footer.appendChild(firstFooter);
//
// const cont = document.createElement("div");
// cont.classList.add("title");
// cont.textContent = "Контакты";
// firstFooter.appendChild(cont);
//
// const address = document.createElement("div");
// address.classList.add("content");
// address.textContent = "Москва. ул. 2-ая Бауманская, д. 5";
// firstFooter.appendChild(address);
//
// const ourEmail = document.createElement("div");
// ourEmail.classList.add("content");
// ourEmail.textContent = "kuraga_team@moviespace.com";
// firstFooter.appendChild(ourEmail);
//
// const secondFooter = document.createElement("div");
// secondFooter.id = "second-footer";
// footer.appendChild(secondFooter);
//
// const info = document.createElement("div");
// info.classList.add("title");
// info.textContent = "Информация";
// secondFooter.appendChild(info);
//
// const year = document.createElement("div");
// year.classList.add("content");
// year.textContent = "© 2022–2022 Movie Space.";
// secondFooter.appendChild(year);
//
// const disc = document.createElement("div");
// disc.classList.add("content");
// disc.textContent = "Может содержать информацию, не предназначенную для несовершеннолетних";
// secondFooter.appendChild(disc);
//
// const thirdFooter = document.createElement("div");
// thirdFooter.id = "third-footer";
// footer.appendChild(thirdFooter);
//
// const fourthFooter = document.createElement("div");
// fourthFooter.id = "fourth-footer";
// footer.appendChild(fourthFooter);
//
// const refT = document.createElement("a");
// refT.href = "/";
// fourthFooter.appendChild(refT);
//
// const telegram = document.createElement("img");
// telegram.classList.add("refer");
// telegram.src = "static/telegram.png";
// refT.appendChild(telegram);
//
// const refI = document.createElement("a");
// refI.href = "https://www.instagram.com/danyatarnovskiy/";
// fourthFooter.appendChild(refI);
//
// const inst = document.createElement("img");
// inst.classList.add("refer");
// inst.src = "static/insta.png";
// refI.appendChild(inst);
//
// const refV = document.createElement("a");
// refV.href = "https://vk.com/dtarnovsky";
// fourthFooter.appendChild(refV);
//
// const vk = document.createElement("img");
// vk.classList.add("refer");
// vk.src = "static/vk.png";
// refV.appendChild(vk);
//
// root.appendChild(f)


createPage();



