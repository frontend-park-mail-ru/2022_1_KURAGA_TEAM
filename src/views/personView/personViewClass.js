import personViewTemplate from './personView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import { person, profile } from 'Modules/network';
import router from "Routing/router.js";
import { routes } from "Routing/constRouting";
import HeadPersonClass from "Components/headPerson/headPerson.js";
import carousel from 'Components/carousel/carouselClass.js';
import FooterClass from "Components/footer/footerClass.js";

import '../../css/person.css';


const moviesConfig = [
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны1',
        genre: 'Фантастика1',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны2',
        genre: 'Фантастика2',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны3',
        genre: 'Фантастика3',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны4',
        genre: 'Фантастика4',
    },
];

const root = document.getElementById('root');

export default class PersonViewClass {
    async render() {
        try {
            const { isAuth, data } = await profile();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);

                return;
            }

            const res = await data;

            const header = new HeaderClass(res.user.username);
            const headPerson = new HeadPersonClass();
            const carouselPop = new carousel('Pop', moviesConfig, 3, "Фильмография");
            const footer = new FooterClass();

            root.innerHTML = personViewTemplate({
                header: header.render(),
                headPerson: headPerson.render(),
                carouselPop: carouselPop.render(),
                footer: footer.render()
            });

            handlerLink()
            header.setHandler();
            carouselPop.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}