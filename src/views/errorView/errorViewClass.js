import errorViewTemplate from './error.pug'
import HeaderClass from "../../components/header/headerClass.js";
import {profile} from "../../modules/network.js";
import router from "../../routing/router.js";
import FooterClass from "../../components/footer/footerClass.js";

import '../../css/error.css';

const root = document.getElementById('root');

export default class ErrorViewClass {
    async render() {
        try {
            const { isAuth, data } = await profile();

            if (!isAuth) {
                router.go('/login');

                return;
            }

            const res = await data;

            const header = new HeaderClass(res.user.username);
            const footer = new FooterClass();

            root.innerHTML = errorViewTemplate({
                header: header.render(),
                footer: footer.render()
            });
        } catch (err) {
            console.error(err);
        }
    }
}