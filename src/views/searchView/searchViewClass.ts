import filmsViewTemplate from "./searchView.pug";
import HeaderClass from "Components/header/headerClass";
import UserModel from "../../models/User";
import handlerLink from "Utils/handlerLink";
import router from "Routing/router";
import FooterClass from "Components/footer/footerClass";
import {routes} from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import {User} from "../../types";
import ListFilmsClass from "../../components/listFilms/listFilmsClass";
import MovieCompilationModel from "../../models/MovieCompilation";
import LoaderViewClass from "../loaderView/loaderViewClass";
import "./search.scss";

export default class SearchViewClass extends BaseViewClass {
    private user: UserModel;
    private movieCompilation: MovieCompilationModel;
    private searchRes: object;
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const {user} = await UserModel.auth();
            if (!user) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            this.user = new UserModel(user);


           // const {searchBody}: { searchBody?: Promise<any> } = await UserModel.getSearchRes();
           // const searchData = await Promise.resolve(searchBody);
           // this.searchRes = searchData;

            const header = new HeaderClass(this.user.userData);
            const footer = new FooterClass();

            super.render(filmsViewTemplate, {
                header: header.render(),
           //     search: this.searchRes,
                footer: footer.render(),
            });

            this.setHandler();
            handlerLink();
            header.setHandler();

        } catch (err) {
            console.error(err);
        }
    }

    setHandler(): void {



    }
    unmount(){}
}
