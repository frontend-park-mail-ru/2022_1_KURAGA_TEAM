import headerTemplate from './header.pug';
import UserModel from "../../models/User.js"

export default class HeaderClass {
    #info;

    constructor(info) {
        this.#info = info;
    }

    render() {
        return headerTemplate({item: this.#info});
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
        const verticalNavbar = document.querySelector('#Capa_1');
        verticalNavbar.addEventListener('click', (e) => {
            console.log("1");
            e.preventDefault();
            const verticalMenu = document.querySelector(".menu-mobile__vertical");
            if (verticalMenu.style.display === 'flex') {
                console.log("srgd");
                verticalMenu.style.display = 'none';
            } else verticalMenu.style.display = 'flex';
        });
    }
}
