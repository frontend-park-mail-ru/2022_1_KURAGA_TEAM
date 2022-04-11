import loginViewTemplate from './loginView.pug';
import FooterClass from 'Components/footer/footerClass.js';
import InputsClass from 'Components/inputs/inputsLogin/inputsClass.js';
import ButtonClass from 'Components/button/buttonClass.js';
import handlerLink from 'Utils/handlerLink.ts';
import router from 'Routing/router.ts';
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import UserModel from "../../models/User.js"

import '../regView/regLog.scss';

const root = document.getElementById('root');

export default class LoginViewClass extends BaseViewClass{

    async render() {
        try {
            const {isAuth, userBody} = await UserModel.auth();
            if (isAuth) {
                router.go(routes.HOME_VIEW);
                return;
            }


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
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }
}
