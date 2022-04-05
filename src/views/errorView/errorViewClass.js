import errorViewTemplate from './error.pug'
import HeaderClass from 'Components/header/headerClass.js';
import UserModel from "../../models/User.js"
import router from "Routing/router.js";
import FooterClass from "Components/footer/footerClass.js";
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import '../../css/error.css';

export default class ErrorViewClass extends BaseViewClass{
    #user;
    async render() {
        try {
            const {isAuth, userBody} = await UserModel.auth();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }

            const userData = await Promise.resolve(userBody);
            this.#user = new UserModel(userData.user);

            const header = new HeaderClass(this.#user.userData);
            const footer = new FooterClass();

            super.render(errorViewTemplate,{
                header: header.render(),
                footer: footer.render()
            });
            
            
        } catch (err) {
            console.error(err);
        }
    }
}