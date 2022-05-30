import headerTemplate from "./header.pug";
import UserModel from "../../models/User";
import {UserData} from "../../types";
import {debounce, isEmpty} from "Utils/Debounce"
import AutoBind from "Utils/autoBind"
import './header.scss'


export default class HeaderClass {
    private readonly info: UserData;
    private autoBind;

    constructor(info) {
        this.info = info;
    }


    render() {

        return headerTemplate({item: this.info});
    }

    setHandler(): void {
        this.autoBind = new AutoBind(".navbar");
        const navbar: HTMLElement = document.querySelector(".navbar");

        window.addEventListener("scroll", () => {
            if (window.scrollY > 15) {

                navbar.classList.add("navbar-color");

            } else if (navbar.classList.contains("navbar-color")) {
                navbar.classList.remove("navbar-color");
            }

        });

        const quit = document.querySelector(".quit");

        quit.addEventListener("click", () => {
            UserModel.quit();
        });

        // this.autoBind.setVariableEvent("quitEvent",UserModel.quit())


        this.autoBind.setVariableEvent("verticalNavBar", this.verticalNavHandler.bind(this));

        this.autoBind.setVariableEvent("showProfile", () => {
            if (this.autoBind.getVariable("logoDisplay") == "") {
                if (this.autoBind.getVariable("profileDisplay") == "") {
                    this.autoBind.setVariable("profileDisplay", "true");
                } else {
                    this.autoBind.setVariable("profileDisplay", "true");
                }
            }
        })


        this.autoBind.setVariableEvent("searchOpen", this.openSearch.bind(this));

        document.querySelector(".search-menu").classList.add("hidden");

        this.autoBind.setVariableEvent("searchClose", this.closeSearch.bind(this));

        this.searchHandler();


    }

    verticalNavHandler(): void {
        const verticalNavbar: HTMLElement = document.querySelector("#Capa_1");
        if (this.autoBind.getVariable("logoDisplay") == "") {
            const verticalMenu: HTMLElement = document.querySelector(
                ".menu-mobile__vertical"
            );
            if (!verticalMenu.classList.contains("hidden")) {
                verticalMenu.classList.add("hidden");
                verticalNavbar.classList.remove("menuSymbol__action");
            } else {
                verticalMenu.classList.remove("hidden");
                verticalNavbar.classList.add("menuSymbol__action");
            }
        }
    }

    closeSearch(): void {

        const searchBtn: HTMLElement = document.querySelector(".search__btn");
        const searchCloseBtn: HTMLElement = document.querySelector(".close-btn");
        const navbar: HTMLElement = document.querySelector(".navbar");
        const a: HTMLInputElement = document.querySelector("#live-search");
        a.value = "";
        this.autoBind.setVariable("inputSearchDisplay", "true");
        searchCloseBtn.classList.add("hidden");
        searchBtn.classList.remove("hidden");

        document.querySelector(".search-menu").classList.add("hidden");
        navbar.style.position = "fixed";
        const screenWidth = window.screen.width;
        const desktopNavbar: HTMLElement = document.querySelector(".desktop-navbar");
        if (screenWidth <= 1000) {
            this.autoBind.setVariable("logoDisplay", "");
        } else if (screenWidth < 1500) {
            desktopNavbar.classList.remove("hidden");
        }
    }

    openSearch(): void {
        const searchBtn: HTMLElement = document.querySelector(".search__btn");
        const searchCloseBtn: HTMLElement = document.querySelector(".close-btn");

        this.autoBind.setVariable("inputSearchDisplay", "");
        document.getElementById("live-search").focus();
        this.autoBind.setVariable("searchMenuDisplay", "");
        searchBtn.classList.add("hidden");
        searchCloseBtn.classList.remove("hidden");
        const screenWidth = window.screen.width;
        const desktopNavbar: HTMLElement = document.querySelector(".desktop-navbar");
        if (screenWidth <= 1000) {
            this.autoBind.setVariable("logoDisplay", "true");
        } else if (screenWidth < 1500) {
            desktopNavbar.classList.add("hidden");
        }
    }

    searchHandler(): void {
        const search = document.querySelector("#live-search");
        search.addEventListener("keyup", debounce(async () => {
            const menu: HTMLElement = document.querySelector(".search-menu");
            const a: HTMLInputElement = document.querySelector("#live-search");
            menu.classList.remove("hidden");
            if (a.value != "") {
                let formJson = JSON.stringify({
                    find: a.value,
                });
                const {searchBody} = await UserModel.getSearchRes(formJson);
                const searchData: object = await Promise.resolve(searchBody);

                menu.innerHTML = "";
                if (isEmpty(searchData)) {
                    const title = document.createElement("div");
                    title.classList.add("font-search");
                    title.textContent = "Ничего не найдено";
                    menu.appendChild(title);
                } else {



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
                                    const searchPic = document.createElement("img");
                                    searchPic.src = res.picture;
                                    searchPic.classList.add("search-pic");
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
                }
            } else {
                menu.classList.add("hidden");
            }
        }))
    }


}
