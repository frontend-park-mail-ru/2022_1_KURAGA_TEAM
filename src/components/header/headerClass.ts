import headerTemplate from './header.pug';
import UserModel from "../../models/User.js"

export default class HeaderClass {
    private readonly info: object;

    constructor(info) {
        this.info = info;
    }

    render() {
        return headerTemplate({item: this.info});
    }

    setHandler() {
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 15) {
                navbar.classList.add('navbar-color');

                return;
            }

            navbar.classList.remove('navbar-color');
        });

        const quit = document.querySelector('.quit');

        quit.addEventListener('click', (e) => {
            e.preventDefault();
            UserModel.quit();
        });
        const verticalNavbar: HTMLElement = document.querySelector('#Capa_1');
        verticalNavbar.addEventListener('click', (e) => {
            e.preventDefault();
            const verticalMenu: HTMLElement = document.querySelector(".menu-mobile__vertical");
            if (verticalMenu.style.display === 'flex') {
                verticalMenu.style.display = 'none';
                verticalNavbar.classList.remove('menuSymbol__action');

            } else {
                verticalMenu.style.display = 'flex';
                verticalNavbar.classList.add('menuSymbol__action');
            }
        });
        const profileIcon = document.querySelector('.btn-profile');
        profileIcon.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const profileMenu: HTMLElement = document.querySelector(".dropdown-content");


            if (profileMenu.style.display === 'block') {
                profileMenu.style.display = 'none';
            } else {
                profileMenu.style.display = 'block';
            }
        });

    }
}
