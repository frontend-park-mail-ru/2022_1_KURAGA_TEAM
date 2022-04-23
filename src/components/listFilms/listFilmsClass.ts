import listFilmsTemplate from './listFilms.pug'
import MovieClass from "Components/movie/movieClass";
import MovieCompilationModel from "../../models/MovieCompilation";

export default class ListFilmsClass {
    private readonly info: MovieCompilationModel;

    constructor(info: MovieCompilationModel) {
        this.info = info;
    }
    render() {

        const unTop = new MovieClass(this.info.movieCompilationData.movies, "");
        
        return listFilmsTemplate({
            items: unTop.render(),
        });
    }
}