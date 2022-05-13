import personViewTemplate from "./personView.pug";
import HeaderClass from "Components/header/headerClass";
import handlerLink from "Utils/handlerLink";
import UserModel from "../../models/User";
import PersonModel from "../../models/Person";
import MovieCompilationModel from "../../models/MovieCompilation";
import router from "Routing/router";
import {routes} from "Routing/constRouting";
import HeadPersonClass from "Components/headPerson/headPersonClass";
import FooterClass from "Components/footer/footerClass";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import MovieCompilationView from "../movieCompilationView/movieCompilationView";
import UserLikeView from "../userLikeView/userLikeView"
import {User} from "../../types";

import "./person.scss";

export default class PersonViewClass extends BaseViewClass {
    private user: UserModel;
    private person: PersonModel;
    private movieCompilation: MovieCompilationModel;


    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);

            const {user} = await UserModel.auth();
            if (!user) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            this.user = new UserModel(user);

            const {person} = await PersonModel.getPerson(id);

            this.person = new PersonModel(person);

            const {movCompBody} = await MovieCompilationModel.getMovieCompilationPerson(id);
            this.movieCompilation = new MovieCompilationModel(0, movCompBody);

            const header = new HeaderClass(this.user.userData);
            const headPerson = new HeadPersonClass(this.person.personData);
            const footer = new FooterClass();

            super.render(personViewTemplate, {
                personImg: this.person.personData,
                header: header.render(),
                headPerson: headPerson.render(),
                select: this.compilationsRender(this.movieCompilation),
                footer: footer.render(),
            });

            const {likesBody} = await UserModel.getLikes()
            const likesData = await Promise.resolve(likesBody);


            handlerLink();
            header.setHandler();
            UserLikeView.setAllLikes(likesData.favorites.id);
            UserLikeView.setHandler();
        } catch (err) {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    compilationsRender(movieCompilation: MovieCompilationModel): string {
        return (
            '<div class = "margin-bottom margin-person">' +
            MovieCompilationView.render(movieCompilation.movieCompilationData) +
            "</div>"
        );
    }

    unmount() {
        MovieCompilationView.unmount(this.movieCompilation.movieCompilationData);
    }
}
