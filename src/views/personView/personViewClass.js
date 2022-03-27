import personViewTemplate from './personView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.js';
import { person,movieCompilationPerson } from 'Modules/network';
import UserModel from "../../models/User.js"
import router from "Routing/router.js";
import { routes } from "Routing/constRouting";
import HeadPersonClass from "Components/headPerson/headPersonClass.js";
import carousel from 'Components/carousel/carouselClass.js';
import FooterClass from "Components/footer/footerClass.js";
import BaseViewClass from '../baseView/baseViewClass.js';
import LoaderViewClass from "../loaderView/loaderViewClass.js";

import '../../css/person.css';


export default class PersonViewClass extends BaseViewClass {
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);

            const [pers,car] = await Promise.all([person(id),movieCompilationPerson(id)]);

            const {isAuth, body} = await UserModel.auth();
            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            const userData = await Promise.resolve(body);

            const [personRes,movieCarousel] = await Promise.all([pers.data,car.data]);



            const header = new HeaderClass(userData.user);
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
