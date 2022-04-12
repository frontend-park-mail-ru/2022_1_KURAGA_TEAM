import personViewTemplate from './personView.pug'
import HeaderClass from 'Components/header/headerClass.js';
import handlerLink from 'Utils/handlerLink.ts';
import UserModel from "../../models/User.js"
import PersonModel from "../../models/Person.js"
import MovieCompilationModel from "../../models/MovieCompilation"
import router from "Routing/router.ts";
import { routes } from "Routing/constRouting";
import HeadPersonClass from "Components/headPerson/headPersonClass.js";
import carousel from 'Components/carousel/carouselClass.js';
import FooterClass from "Components/footer/footerClass.ts";
import BaseViewClass from '../baseView/baseViewClass';
import LoaderViewClass from "../loaderView/loaderViewClass";

import './person.scss';

interface User {
    user: object,
}

export default class PersonViewClass extends BaseViewClass {
    private user:UserModel;
    private person : PersonModel;
    private movieCompilation: MovieCompilationModel;
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);


            const {isAuth, userBody}: { isAuth: boolean, userBody: Promise<User> } = await UserModel.auth();
            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            const userData = await Promise.resolve(userBody);
            this.user = new UserModel(userData.user);

            const {persBody} = await PersonModel.getPerson(id);
            const persData = await Promise.resolve(persBody);
            this.person = new PersonModel(persData);

            const {movCompBody} = await MovieCompilationModel.getMovieCompilationPerson(id);
            const movieCompilationData = await Promise.resolve(movCompBody);
            this.movieCompilation = new MovieCompilationModel(movieCompilationData);

            const header = new HeaderClass(this.user.userData);
            const headPerson = new HeadPersonClass(this.person.personData);
            const carouselPop = new carousel(0, this.movieCompilation.movieCompilationData, false);
            const carouselPopMobile = new carousel(0, this.movieCompilation.movieCompilationData, true);
            const footer = new FooterClass();

            super.render(personViewTemplate,{
                personImg: this.person.personData,
                header: header.render(),
                headPerson: headPerson.render(),
                carouselPop: carouselPop.render(),
                carouselPopMobile: carouselPopMobile.render(),
                footer: footer.render()
            });

            handlerLink()
            header.setHandler();
            carouselPop.setHandler();
            carouselPopMobile.setHandler();
        } catch (err) {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }
}
