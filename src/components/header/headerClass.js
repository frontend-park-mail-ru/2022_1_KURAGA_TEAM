import headerTemplate from './header.pug';
import { logout } from '../../modules/network.js';
import router from '../../routing/router.js';

export default class HeaderClass {
    #name;

    constructor(name) {
        this.#name = name;
    }

    render() {
        return headerTemplate({item: this.#name});
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
