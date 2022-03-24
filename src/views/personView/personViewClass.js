import personViewTemplate from './personView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import { person, profile,movieCompilationPerson } from 'Modules/network';
import router from "Routing/router.js";
import { routes } from "Routing/constRouting";
import HeadPersonClass from "Components/headPerson/headPersonClass.js";
import carousel from 'Components/carousel/carouselClass.js';
import FooterClass from "Components/footer/footerClass.js";
import BaseViewClass from '../baseView/baseViewClass.js';
import LoaderViewClass from "../loaderView/loaderViewClass.js";

import '../../css/person.css';

// const moviesConfig = [
//     {
//         id: 8,
//         picture: "gucci.jpg",
//         name: 'Звездные войны1',
//         genre: [],
//     },
//     {
//         id: 5,
//         picture: "star.png",
//         name: 'Звездные войнфцвфцвы2',
//         genre: ['Фантастика3','Фантастика2'],
//     },
//     {
//         id: 5,
//         picture: "star.png",
//         name: 'Звездные войны3фцвфцв',
//         genre: ['Фантастика4'],
//     },
//     {
//         id: 5,
//         picture: "star.png",
//         name: 'Звездные войны4',
//         genre: ['Фантастика4','afdawd'],
//     },
//     {
//         id: 5,
//         picture: "star.png",
//         name: 'Звездные войны4',
//         genre: ['Фантастика4','afdawd','awdawdawd'],
//     }
// ];

export default class PersonViewClass extends BaseViewClass {
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);

            const [user, pers,car] = await Promise.all([profile(), person(id),movieCompilationPerson(id)]);

            if (!user.isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            const [userRes, personRes,movieCarousel] = await Promise.all([user.data, pers.data,car.data]);


            console.log(personRes);
            const header = new HeaderClass(userRes.user);
            const headPerson = new HeadPersonClass(personRes);
            const carouselPop = new carousel('Pop', movieCarousel.movies, 4, movieCarousel.compilation_name);
            const footer = new FooterClass();

            super.render(personViewTemplate,{
                photo: personRes.photo,
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
