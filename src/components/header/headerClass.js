import headerTemplate from './header.js';
import { logout } from '../../modules/network.js';
import router from '../../routing/router.js';

export default class HeaderClass {
    #name;

    constructor(name) {
        this.#name = name;
    }

    render() {
        console.log(this.#name);
        return headerTemplate(this.#name);
    }

    setHandler() {
        const quit = document.querySelector('.quit');
        quit.addEventListener('click', (e) => {
            e.preventDefault();
            logout()
                .then(() => {
                    router.go('login');
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }
}
