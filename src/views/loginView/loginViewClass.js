import loginViewTemplate from './loginView.js';
import FooterClass from '../../components/footer/footerClass.js';
import InputsClass from '../../components/inputs/inputsLogin/inputsClass.js';
import ButtonClass from '../../components/button/buttonClass.js';
import handlerLink from '../../utils/handlerLink.js';
import { profile } from '../../modules/network.js';
import router from '../../routing/router.js';

const root = document.getElementById('root');

export default class LoginViewClass {
    render() {
        profile()
            .then(({ isAuth }) => {
                if (isAuth) {
                    router.go('/');

                    return;
                }

                const footer = new FooterClass();
                const inputs = new InputsClass();
                const button = new ButtonClass('Войти');

                root.innerHTML = loginViewTemplate({
                    inputs: inputs.render(),
                    button: button.render(),
                    footer: footer.render(),
                });

                inputs.setHandler();
                handlerLink();
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
