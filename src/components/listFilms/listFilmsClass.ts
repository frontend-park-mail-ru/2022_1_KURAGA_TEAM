import listFilmsTemplate from './listFilms.pug'
import MovieClass from "Components/movie/movieClass";
import MovieCompilationModel from "../../models/MovieCompilation";
import AutoBind from "Utils/autoBind"
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import './listFilms.scss'

export default class ListFilmsClass {
    private readonly info: MovieCompilationModel;

    constructor(info: MovieCompilationModel) {
        this.info = info;
    }
    render() {
        const unTop = new MovieClass(this.info.movieCompilationData.movies, "", true);
        
        return listFilmsTemplate({
            items: unTop.render(),
        });
    }
    static setHandler(){
        const autoBind = new AutoBind;

        autoBind.setVariableEvent("clickMovieDesc",(e)=>{
            e.preventDefault();

            if(e.target.classList.contains("common-descr")){
                router.go(routes.MOVIE_VIEW+e.target.id);
            }
        });
    }
}