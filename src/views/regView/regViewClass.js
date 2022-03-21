import regViewTemplate from './regView.pug';
import FooterClass from '../../components/footer/footerClass.js';
import InputsClass from '../../components/inputs/inputsReg/inputsClass.js';
import ButtonClass from '../../components/button/buttonClass.js';
import handlerLink from '../../utils/handlerLink.js';
import { profile } from '../../modules/network.js';
import router from '../../routing/router.js';

import '../../css/regLog.css';

const root = document.getElementById('root');

export default class RegViewClass {
    render() {
        profile()
            .then(({ isAuth }) => {
                if (isAuth) {
                    router.go('/');

                    return;
                }

                const footer = new FooterClass();
                const inputs = new InputsClass();
                const button = new ButtonClass('Зарегистрироваться');

                root.innerHTML = regViewTemplate({
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
