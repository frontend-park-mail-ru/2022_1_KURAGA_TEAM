import headerTemplate from './header.js';
import { logout } from '../../modules/network.js';
import router from '../../routing/router.js';

const configUser = {
    name: 'admin',
    src: '',
};

export default class HeaderClass {
    render() {
        return headerTemplate(configUser);
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
