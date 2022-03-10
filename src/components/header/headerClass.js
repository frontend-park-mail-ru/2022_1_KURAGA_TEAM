import headerTemplate from './header.js';
import { logout } from '../../modules/network.js';
import router from '../../routing/router.js';

export default class HeaderClass {
    #name;

    constructor(name) {
        this.#name = name;
    }

    render() {
        return headerTemplate(this.#name);
    }

    setHandler() {
        const quit = document.querySelector('.quit');
        quit.addEventListener('click', (e) => {
            e.preventDefault();
            logout()
                .then(() => {
                    console.log(1)
                    router.go('login');
                })
                .catch((err) => {
                    console.log(2)
                    console.error(err);
                });
        });
    }
}
