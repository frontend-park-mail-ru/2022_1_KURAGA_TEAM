import regViewTemplate from './regView.pug';
import FooterClass from 'Components/footer/footerClass.js';
import InputsClass from 'Components/inputs/inputsReg/inputsClass.js';
import ButtonClass from 'Components/button/buttonClass.js';
import handlerLink from 'Utils/handlerLink.js';
import router from 'Routing/router.js';
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import UserModel from "../../models/User.js"
import '../../css/regLog.css';
import OfflineViewClass from "../offlineView/offlineViewClass";


const root = document.getElementById('root');

export default class RegViewClass extends BaseViewClass {
    async render() {
        try {
            if (!navigator.onLine) {
                const offline = new OfflineViewClass();
                offline.render();

                return;
            }

            const { isAuth } = await UserModel.auth();
            console.log(isAuth);
            if (isAuth) {
                router.go(routes.HOME_VIEW);
                return;
            }



            const footer = new FooterClass();
            const inputs = new InputsClass();
            const button = new ButtonClass('Зарегистрироваться');

            
            super.render(regViewTemplate,{
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
