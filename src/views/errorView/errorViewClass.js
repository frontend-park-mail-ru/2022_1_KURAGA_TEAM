import errorViewTemplate from './error.pug'
import HeaderClass from "../../components/header/headerClass.js";
import {profile} from "../../modules/network.js";
import router from "../../routing/router.js";
import FooterClass from "../../components/footer/footerClass.js";

const root = document.getElementById('root');

export default class ErrorViewClass {
    render() {
        profile()
            .then(({ isAuth, data }) => {
                if (!isAuth) {
                    router.go('/login');

                    return;
                }
                data.then((res) => {
                    const header = new HeaderClass(res.username);
                    const footer = new FooterClass();

                    root.innerHTML = errorViewTemplate({
                        header: header.render(),
                        footer: footer.render()
                    });
                })
            })

    }
}