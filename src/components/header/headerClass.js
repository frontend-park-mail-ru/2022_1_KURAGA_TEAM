import headerTemplate from './header.pug';
import { logout } from '../../modules/network.js';
import router from '../../routing/router.js';
import { routes } from "Routing/constRouting";
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
        })

        const quit = document.querySelector('.quit');

        quit.addEventListener('click', (e) => {
            e.preventDefault();
            logout()
                .then(() => {
                    router.go(routes.LOGIN_VIEW);
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }
}
