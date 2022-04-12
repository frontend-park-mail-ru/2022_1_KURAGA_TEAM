import personViewTemplate from './personView.pug'
import HeaderClass from 'Components/header/headerClass';
import handlerLink from 'Utils/handlerLink';
import UserModel from "../../models/User"
import PersonModel from "../../models/Person"
import MovieCompilationModel from "../../models/MovieCompilation"
import router from "Routing/router";
import { routes } from "Routing/constRouting";
import HeadPersonClass from "Components/headPerson/headPersonClass";
import FooterClass from "Components/footer/footerClass";
import BaseViewClass from '../baseView/baseViewClass';
import LoaderViewClass from "../loaderView/loaderViewClass";
import { User } from "../../types";

import './person.scss';


export default class PersonViewClass extends BaseViewClass {
    private user:UserModel;
    private person : PersonModel;
    private movieCompilation: MovieCompilationModel;
    private movieCompilationMobile: MovieCompilationModel;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);

            const {isAuth, userBody}: { isAuth?: boolean, userBody?: Promise<any> } = await UserModel.auth();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            const userData: User = await Promise.resolve(userBody);
            this.user = new UserModel(userData.user);

            const {persBody} = await PersonModel.getPerson(id);
            console.log(persBody);
            const persData = await Promise.resolve(persBody);
            this.person = new PersonModel(persData);

            const {movCompBody} = await MovieCompilationModel.getMovieCompilationPerson(id);
            const movieCompilationData = await Promise.resolve(movCompBody);

            this.movieCompilation = new MovieCompilationModel(0, movieCompilationData, false);
            this.movieCompilationMobile = new MovieCompilationModel(0, movieCompilationData, true);

            const header = new HeaderClass(this.user.userData);
            const headPerson = new HeadPersonClass(this.person.personData);
            const footer = new FooterClass();

            super.render(personViewTemplate,{
                personImg: this.person.personData,
                header: header.render(),
                headPerson: headPerson.render(),
                select: this.compilationsRender(this.movieCompilation),
                selectMobile :this.compilationsRender(this.movieCompilationMobile),
                footer: footer.render()
            });

            handlerLink();
            header.setHandler();
            this.movieCompilation.setHandler();
            this.movieCompilationMobile.setHandler();
        } catch (err) {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }
    compilationsRender(movieCompilation : MovieCompilationModel) : string{
        return '<div class = "margin-bottom movie-carousel">'+movieCompilation.render()+'</div>';
    }
}
