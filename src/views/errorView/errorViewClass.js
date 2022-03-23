import errorViewTemplate from './error.pug'
import HeaderClass from 'Components/header/headerClass.js';
import { profile } from 'Modules/network.js';
import router from "Routing/router.js";
import FooterClass from "Components/footer/footerClass.js";
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import '../../css/error.css';

const root = document.getElementById('root');

export default class ErrorViewClass extends BaseViewClass{
    async render() {
        try {
            const { isAuth, data } = await profile();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);

                return;
            }

            const res = await data;
            const header = new HeaderClass(res.user);
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