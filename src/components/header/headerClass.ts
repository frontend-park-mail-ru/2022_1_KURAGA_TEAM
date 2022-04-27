import headerTemplate from "./header.pug";
import UserModel from "../../models/User";
import router from "Routing/router";
import {routes} from "Routing/constRouting";
import {UserData} from "../../types";


export default class HeaderClass {
    private readonly info: UserData;

    constructor(info) {
        this.info = info;
    }


    render() {

        const searchConfig = {
            res: ""
        }
        return headerTemplate({item: this.info, search: searchConfig});
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
            console.log(document.getElementById("live-search"));
            const a:HTMLInputElement = document.querySelector("#live-search");
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

        //const searchMenuRes: HTMLElement = document.querySelector(".search-menu");
        const a = document.querySelector("#live-search");
        const res = document.getElementById("res");
        a.addEventListener("keyup", function () {
            searchMenuRes.style.display = "flex";
            let formData = new FormData();
            formData.append("search", this.value);
            UserModel.getSearchMainRes(formData);

            //res.textContent = this.value;
        });

    }
}
