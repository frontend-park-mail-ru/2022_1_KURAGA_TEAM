import personViewTemplate from './personView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import { person, profile } from 'Modules/network';
import router from "Routing/router.js";
import { routes } from "Routing/constRouting";
import HeadPersonClass from "Components/headPerson/headPerson.js";
import carousel from 'Components/carousel/carouselClass.js';
import FooterClass from "Components/footer/footerClass.js";
import BaseViewClass from '../baseView/baseViewClass.js';

import '../../css/person.css';


const moviesConfig = [
    {
        id: 8,
        picture: "gucci.jpg",
        name: 'Звездные войны1',
        genre: [],
    },
    {
        id: 5,
        picture: "star.png",
        name: 'Звездные войнфцвфцвы2',
        genre: ['Фантастика3','Фантастика2'],
    },
    {
        id: 5,
        picture: "star.png",
        name: 'Звездные войны3фцвфцв',
        genre: ['Фантастика4'],
    },
    {
        id: 5,
        picture: "star.png",
        name: 'Звездные войны4',
        genre: ['Фантастика4','afdawd'],
    },
    {
        id: 5,
        picture: "star.png",
        name: 'Звездные войны4',
        genre: ['Фантастика4','afdawd','awdawdawd'],
    }
];

const root = document.getElementById('root');

export default class PersonViewClass extends BaseViewClass {
  
    async render() {
        try {
            const { isAuth, data } = await profile();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);

                return;
            }

            const res = await data;

            const header = new HeaderClass(res.user);
            const headPerson = new HeadPersonClass();
            const carouselPop = new carousel('Pop', moviesConfig, 4, "Фильмография");
            const footer = new FooterClass();

            super.render(personViewTemplate,{
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
