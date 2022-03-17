import personViewTemplate from './personView.pug'
import HeaderClass from '../../components/header/headerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import { profile } from '../../modules/network.js';
import router from "../../routing/router.js";
import HeadPersonClass from "../../components/headPerson/headPerson.js";
import FooterClass from "../../components/footer/footerClass.js";

const root = document.getElementById('root');

export default class PersonViewClass {
    render() {
        // profile()
        //     .then(({ isAuth, data }) => {
        //         if (!isAuth) {
        //             router.go('login');
        //             return;
        //         }
        //         data.then((res) => {
                    const header = new HeaderClass("res.username");
                    const headPerson = new HeadPersonClass();
                    const footer = new FooterClass();

                    root.innerHTML = personViewTemplate({
                        header: header.render(),
                        headPerson: headPerson.render(),
                        footer: footer.render()
                    });

                    handlerLink()
                    header.setHandler();
            //     })
            // })
            // .catch((err) => {
            //     console.error(err);
            // })
    }
}
