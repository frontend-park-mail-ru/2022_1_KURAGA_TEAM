import listFilmsTemplate from './listFilms.pug'

import MovieCompilationModel from "../../models/MovieCompilation";

export default class ListFilmsClass {
    private readonly info: MovieCompilationModel;

    constructor(info: MovieCompilationModel) {
        this.info = info;
    }
    render() {

        
        return listFilmsTemplate({
            info: this.info.movieCompilationData,
        });
    }
}