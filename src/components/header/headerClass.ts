import headerTemplate from "./header.pug";
import UserModel from "../../models/User";
import router from "Routing/router";
import {routes} from "Routing/constRouting";
import {UserData} from "../../types";
import {debounce, isEmpty} from "./DebounceSearch"
import './header.scss'


export default class HeaderClass {
    private readonly info: UserData;
    result: object;

    constructor(info) {
        this.info = info;
    }


    render() {


        return headerTemplate({item: this.info});
    }

    setHandler() {


        const navbar: HTMLElement = document.querySelector(".navbar");


        window.addEventListener("scroll", () => {
            if (window.scrollY > 15) {

                navbar.classList.add("navbar-color");
                return;
            }


            navbar.classList.remove("navbar-color");
        });

        const quit = document.querySelector(".quit");

        quit.addEventListener("click", (e) => {
            e.preventDefault();
            UserModel.quit();
        });

        const verticalNavbar: HTMLElement = document.querySelector("#Capa_1");
        verticalNavbar.addEventListener("click", (e) => {
            e.preventDefault();

            if (logo.style.display != "none") {
                const verticalMenu: HTMLElement = document.querySelector(
                    ".menu-mobile__vertical"
                );
                if (verticalMenu.style.display === "flex") {
                    verticalMenu.style.display = "none";
                    verticalNavbar.classList.remove("menuSymbol__action");
                } else {
                    verticalMenu.style.display = "flex";
                    verticalNavbar.classList.add("menuSymbol__action");
                }
            }
        });
        const profileIcon = document.querySelector(".btn-profile");
        profileIcon.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (logo.style.display == "block") {
                const profileMenu: HTMLElement =
                    document.querySelector(".dropdown-content");
                if (profileMenu.style.display === "block") {
                    profileMenu.style.display = "none";
                } else {
                    profileMenu.style.display = "block";
                }
            }
        });

        const searchBtn: HTMLElement = document.querySelector(".search__btn");
        const searchCloseBtn: HTMLElement = document.querySelector(".close-btn");


        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const searchMenu: HTMLElement =
                document.querySelector(".menu__input");
            searchMenu.style.display = "block";
            searchBtn.style.display = "none";
            searchCloseBtn.style.display = "block";
            const screenWidth = window.screen.width;
            const logo: HTMLElement = document.querySelector(".logo-link");

            if (screenWidth <= 1000) {
                logo.style.display = "none";
            }

        })

        const logo: HTMLElement = document.querySelector(".logo-link");
        const searchMenu: HTMLElement =
            document.querySelector(".menu__input");


        const searchMenuRes: HTMLElement = document.querySelector(".search-menu");
        searchCloseBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const a: HTMLInputElement = document.querySelector("#live-search");
            a.value = "";
            searchMenu.style.display = "none";
            searchCloseBtn.style.display = "none";
            searchBtn.style.display = "block";
            searchMenuRes.style.display = "none";
            navbar.style.position = "fixed";
            const screenWidth = window.screen.width;

            if (screenWidth <= 1000) {
                logo.style.display = "block";
            }
        })


        const menu: HTMLElement = document.querySelector(".search-menu");
        const a = document.querySelector("#live-search");
        a.addEventListener("keyup", debounce(async () => {
            const a: HTMLInputElement = document.querySelector("#live-search");
            let formJson;
            searchMenuRes.style.display = "flex";
            if (a.value != "") {
                formJson = JSON.stringify({
                    find: a.value,
                });
                const {searchBody} = await UserModel.getSearchRes(formJson);
                const searchData: object = await Promise.resolve(searchBody);

                console.log(searchBody, searchData);
                menu.innerHTML = "";
                if (isEmpty(searchData)) {
                    const title = document.createElement("div");
                    title.classList.add("font-search");
                    title.textContent = "Ничего не найдено";
                    menu.appendChild(title);
                } else {

                    const title = document.createElement("div");
                    title.classList.add("font-search");
                    title.textContent = "Возможно, вы искали";
                    menu.appendChild(title);

                    for (let key in searchData) {
                        if (searchData[key] != null) {
                            const topic = document.createElement("div");
                            topic.classList.add("topic");
                            const nameTopic = document.createElement("a");
                            nameTopic.classList.add("font-topics", "padding-names");
                            switch (key) {
                                case "movies":
                                    nameTopic.textContent = "Фильмы";
                                    break;
                                case "series":
                                    nameTopic.textContent = "Сериалы";
                                    break;
                                case "persons":
                                    nameTopic.textContent = "Персоны";
                            }
                            topic.appendChild(nameTopic);


                            searchData[key].forEach((res, i) => {
                                if (i <= 1) {
                                    const searchTopic = document.createElement("div");
                                    searchTopic.classList.add("search-topic");
                                    const searchTopicName = document.createElement("a");
                                    searchTopicName.classList.add("font-menu-search", "padding-names");
                                    const searchTopicInfo = document.createElement("a");
                                    if (key == "persons") {
                                        searchTopicName.href = `/person/` + res.id;
                                        searchTopicName.textContent = res.name;
                                        searchTopicInfo.classList.add("genre", "padding-names");
                                        searchTopicInfo.textContent = res.position[0];
                                    } else {
                                        searchTopicName.href = `/movie/` + res.id;
                                        searchTopicName.textContent = res.name;
                                        searchTopicInfo.classList.add("genre", "padding-names");
                                        if (res.genre != null) {
                                            if (res.genre.length > 1) {
                                                searchTopicInfo.textContent = res.genre[0].name + '/' + res.genre[1].name;
                                            } else if (res.genre.length > 0) {
                                                searchTopicInfo.textContent = res.genre[0].name;
                                            }
                                        }

                                    }
                                    searchTopic.appendChild(searchTopicName);
                                    searchTopic.appendChild(searchTopicInfo);
                                    topic.appendChild(searchTopic);
                                }
                            })


                            menu.appendChild(topic);

                        }

                    }

                    const titleEnd = document.createElement("a");
                    titleEnd.classList.add("font-search");
                    titleEnd.id = "all-res-topic";
                    titleEnd.textContent = "Показать все результаты";
                    menu.appendChild(titleEnd);
                }
            } else {
                menu.style.display = "none";
            }
        }))
    }

}
