import loginViewTemplate from './loginView.pug';
import FooterClass from 'Components/footer/footerClass.js';
import InputsClass from 'Components/inputs/inputsLogin/inputsClass.js';
import ButtonClass from 'Components/button/buttonClass.js';
import handlerLink from 'Utils/handlerLink.js';
import router from 'Routing/router.js';
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import UserModel from "../../models/User.js"

import '../../css/regLog.css';

const root = document.getElementById('root');

export default class LoginViewClass extends BaseViewClass{

    async render() {
        try {

            UserModel.auth().then((authData) => {
                if (authData.isAuth) {
                    router.go(routes.HOME_VIEW);
                    return;
                }
            });

            const footer = new FooterClass();
            const inputs = new InputsClass();
            const button = new ButtonClass('Войти');

            super.render(loginViewTemplate,{
                inputs: inputs.render(),
                button: button.render(),
                footer: footer.render(),
            });
            
            inputs.setHandler();
            handlerLink();
        } catch (err) {
            console.error(err);
        }
    }
}
