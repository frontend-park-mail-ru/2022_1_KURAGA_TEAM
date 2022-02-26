const root = document.getElementById('root');

//         first row  header + main movie
const firstRow = document.createElement("div");
firstRow.className = "header"

const header = document.createElement("div");
header.className = "navbar font";

header.innerHTML += `<div id="logo"><img src="static/logo.png" style  = "height: 100px"></div>`;
headerStr = ["Главная", "Фильмы", "Сериалы", "Избранное"]
headerStr.forEach((str) => {
    const refT = document.createElement("a");
    refT.className = "label font";
    refT.href = "/";
    refT.textContent =str;
    header.appendChild(refT)

});
header.innerHTML += `<div id="space"></div><div id = "searchBtn"><img src="static/lupa.png" class = "label" style  = "height: 35px"></div>`
header.innerHTML += `<div id = "profileImg"><img src="static/profile.png" class = "label" style  = "height: 58px"></div>`
firstRow.appendChild(header)

///////////////////////


const mainMovie = document.createElement("div");
mainMovie.className = "mainMovie";

const descr = document.createElement("div")
descr.className = "sidebar"
const title = document.createElement("div")
title.className = "font title"
title.innerHTML += `<div class = "titleName">1+1</div>`
title.innerHTML += '<div class="titleDescr">«Sometimes you have to reach into someone else\'s world to find out what\'s missing in your own»</div>'

const btn = document.createElement("div")
btn.className = "btn"
const refBtn = document.createElement("a");
refBtn.className = "fontOther";
refBtn.href = "/";
refBtn.textContent ="Смотреть онлайн";
btn.appendChild(refBtn)

const btnInfo = document.createElement("div")
btnInfo.className = "btnInfo"
const refBtnInfo = document.createElement("a");
refBtnInfo.className = "fontOther";
refBtnInfo.href = "/";
refBtnInfo.textContent ="О фильме";
btnInfo.appendChild(refBtnInfo)

descr.appendChild(title)
descr.appendChild(btn)
descr.appendChild(btnInfo)

mainMovie.appendChild(descr)
firstRow.appendChild(mainMovie)
root.appendChild(firstRow)





// подборки
const selection = document.createElement("div");
selection.className = "main selection";
MovieName = ["Популярное", "Лучшее за 2021", "Семейное"]
for (let i = 0; i < MovieName.length; i++)  {

    const selectFirst = document.createElement("div");
    selectFirst.className = "select-" +(i+1);
    const selectPop = document.createElement("div");
    selectPop.className = "selectPop font";
    selectPop.innerHTML += `<div style = "inline-size: max-content;font-size: 36px;line-height: 42px;margin-inline-start: 30px;">${MovieName[i]}</div>`

//MovieUrl = ["star.png", "star.png", "star.png", "star.png","star.png"]
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
        desMov.innerHTML += 'Звёздные войны<img src="static/heart.png" style = "width: 36px;">'
        desMov.innerHTML += '<div class = "genre font">Фантастика</div>'
        refMov.appendChild(hrefMov)
        movie.appendChild(refMov)
        movie.appendChild(desMov)
        selectMovie.appendChild(movie)
        selectPop.appendChild(selectMovie)
    }

    selectFirst.appendChild(selectPop)
    selection.appendChild(selectFirst)
    root.appendChild(selection)

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









