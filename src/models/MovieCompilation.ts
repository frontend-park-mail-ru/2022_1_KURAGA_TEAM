import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import carouselTemplate from "Components/carousel/carousel.pug";
import movingCarousel from "Components/carousel/movingCarousel";
import {MovieCompilationData} from "../types";
import MovieClass from "Components/movie/movieClass";

export default class MovieCompilationModel {
    private readonly data: MovieCompilationData;
    private defaultMovies = [{
        id: -1,
        name: "",
        picture: "",
        tagline: "",
        genre: [{id: 0, name: ""}],
        age_limit: "",
        is_movie: true,
        country: "",
        description: "",
        duration: "",
        kinopoisk_rating: "",
        name_picture: "",
        rating: "",
        staff: "",
        trailer: "",
        video: "",
        year: "",
    }]


    constructor(index, movieCompilationData, id?, check?) {
        if (Array.isArray(movieCompilationData)) {
            this.data = {
                movies: movieCompilationData,
                id: index,
                idSerial: id,
                check,
                idBtn: Math.floor(Math.random() * (-100)),
            };
        } else {
            if (movieCompilationData.movies == null) {
                this.data = {
                    id: index,
                    compilationName: movieCompilationData.compilation_name,
                    movies: this.defaultMovies,
                };
            } else {
                this.data = {
                    id: index,
                    compilationName: movieCompilationData.compilation_name,
                    movies: movieCompilationData.movies,
                };
            }
        }
    }

    get movieCompilationData() {
        return this.data;
    }

    static async movies() {
        try {
            return await ajaxReq.get({
                path: "/movieCompilations",
            });
        } catch (err) {
            return err;
        }
    }

    static async movieCompilationMovie(id) {
        try {
            return await ajaxReq.get({
                path: `/movieCompilations/movie/${id}`,
            });
        } catch (err) {
            return err;
        }
    }

    static async movieCompilationPerson(id) {
        try {
            return await ajaxReq.get({
                path: `/movieCompilations/person/${id}`,
            });
        } catch (err) {
            return err;
        }
    }

    static async favorites() {
        try {
            return await ajaxReq.get({
                path: `/favorites`,
            });
        } catch (err) {
            return err;
        }
    }

    static async allMovies(limit, offset) {
        try {
            return await ajaxReq.get({
                path: `/movies?limit=${limit}&offset=${offset}`,
            });
        } catch (err) {
            return err;
        }
    }

    static async allSeries() {
        try {
            return await ajaxReq.get({
                path: `/series`,
            });
        } catch (err) {
            return err;
        }
    }

    static async allGenre(id) {
        try {
            return await ajaxReq.get({
                path: `/movieCompilations/genre/${id}`,
            });
        } catch (err) {
            return err;
        }
    }

    static getMovieCompilations() {
        return new Promise<{movCompBody:Array<MovieCompilationModel>}>((movCompBody) => {
            this.movies()
                .then(({data}) => {
                    data
                        .then((movieCompilations)=>{
                           // movieCompilations = [{"compilation_name":"Топ рейтинга","movies":[{"id":7,"name":"Зеленая миля","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheGreenMile.webp","rating":9},{"id":14,"name":"Доктор Хаус","genre":[{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/HouseMD.webp","rating":9.5},{"id":28,"name":"Чернобыль","genre":[{"id":3,"name":"Драма"},{"id":9,"name":"История"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Chernobyl.webp","rating":8.7},{"id":3,"name":"Начало","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Inception.webp","rating":3},{"id":6,"name":"Интерстеллар","genre":[{"id":6,"name":"Фантастика"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Interstellar.webp","rating":6},{"id":15,"name":"Джентельмены","genre":[{"id":2,"name":"Боевик"},{"id":1,"name":"Комедия"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Gentlemen.webp","rating":8.5},{"id":25,"name":"Поймай меня если сможешь","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/CatchMeIfYouCan.webp","rating":8},{"id":21,"name":"Пираты карибского моря","genre":[{"id":7,"name":"Фэнтези"},{"id":2,"name":"Боевик"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Pirates.webp","rating":8.5},{"id":2,"name":"Титаник","genre":[{"id":5,"name":"Мелодрама"},{"id":9,"name":"История"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Titanic.webp","rating":2},{"id":27,"name":"Семь","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Seven.webp","rating":6.2},{"id":23,"name":"Шестое чувство","genre":[{"id":10,"name":"Детектив"},{"id":7,"name":"Фэнтези"}],"picture":"https://movie-space.ru/api/v1/minio/posters/SixFeeling.webp","rating":9},{"id":18,"name":"Молодой папа","genre":[{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/YoungPope.webp","rating":5.5}]},{"compilation_name":"Лучшее за 2011 год","movies":[{"id":10,"name":"Девушка с татуировкой дракона","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheGirlwiththeDragonTattoo.webp","rating":6},{"id":12,"name":"Живая сталь","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":12,"name":"Семейный"}],"picture":"https://movie-space.ru/api/v1/minio/posters/RealSteel.webp","rating":6.3},{"id":9,"name":"Время","genre":[{"id":6,"name":"Фантастика"},{"id":5,"name":"Мелодрама"},{"id":2,"name":"Боевик"}],"picture":"https://movie-space.ru/api/v1/minio/posters/InTime.webp","rating":10},{"id":11,"name":"Драйв","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Drive.webp","rating":-1}]},{"compilation_name":"Боевик","movies":[{"id":1,"name":"Аватар","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Avatar.webp","rating":9},{"id":12,"name":"Живая сталь","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":12,"name":"Семейный"}],"picture":"https://movie-space.ru/api/v1/minio/posters/RealSteel.webp","rating":6.3},{"id":8,"name":"Мстители","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":7,"name":"Фэнтези"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheAvengers.webp","rating":1},{"id":13,"name":"Исходный код","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/SourceCode.webp","rating":7},{"id":21,"name":"Пираты карибского моря","genre":[{"id":7,"name":"Фэнтези"},{"id":2,"name":"Боевик"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Pirates.webp","rating":8.5},{"id":9,"name":"Время","genre":[{"id":6,"name":"Фантастика"},{"id":5,"name":"Мелодрама"},{"id":2,"name":"Боевик"}],"picture":"https://movie-space.ru/api/v1/minio/posters/InTime.webp","rating":10},{"id":3,"name":"Начало","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Inception.webp","rating":3},{"id":15,"name":"Джентельмены","genre":[{"id":2,"name":"Боевик"},{"id":1,"name":"Комедия"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Gentlemen.webp","rating":8.5}]},{"compilation_name":"США","movies":[{"id":2,"name":"Титаник","genre":[{"id":5,"name":"Мелодрама"},{"id":9,"name":"История"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Titanic.webp","rating":2},{"id":1,"name":"Аватар","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Avatar.webp","rating":9},{"id":27,"name":"Семь","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Seven.webp","rating":6.2},{"id":24,"name":"Отель Гранд Будапешт","genre":[{"id":1,"name":"Комедия"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/GrandHotelBudapest.webp","rating":6},{"id":12,"name":"Живая сталь","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":12,"name":"Семейный"}],"picture":"https://movie-space.ru/api/v1/minio/posters/RealSteel.webp","rating":6.3},{"id":23,"name":"Шестое чувство","genre":[{"id":10,"name":"Детектив"},{"id":7,"name":"Фэнтези"}],"picture":"https://movie-space.ru/api/v1/minio/posters/SixFeeling.webp","rating":9},{"id":10,"name":"Девушка с татуировкой дракона","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheGirlwiththeDragonTattoo.webp","rating":6},{"id":8,"name":"Мстители","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":7,"name":"Фэнтези"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheAvengers.webp","rating":1},{"id":26,"name":"Исчезнувшая","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/GoneGirl.webp","rating":10},{"id":17,"name":"Волк с Уолл-Стрит","genre":[{"id":3,"name":"Драма"},{"id":1,"name":"Комедия"}],"picture":"https://movie-space.ru/api/v1/minio/posters/WolfOfWallStreet.webp","rating":2},{"id":6,"name":"Интерстеллар","genre":[{"id":6,"name":"Фантастика"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Interstellar.webp","rating":6},{"id":28,"name":"Чернобыль","genre":[{"id":3,"name":"Драма"},{"id":9,"name":"История"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Chernobyl.webp","rating":8.7},{"id":13,"name":"Исходный код","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/SourceCode.webp","rating":7},{"id":21,"name":"Пираты карибского моря","genre":[{"id":7,"name":"Фэнтези"},{"id":2,"name":"Боевик"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Pirates.webp","rating":8.5},{"id":14,"name":"Доктор Хаус","genre":[{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/HouseMD.webp","rating":9.5},{"id":9,"name":"Время","genre":[{"id":6,"name":"Фантастика"},{"id":5,"name":"Мелодрама"},{"id":2,"name":"Боевик"}],"picture":"https://movie-space.ru/api/v1/minio/posters/InTime.webp","rating":10},{"id":11,"name":"Драйв","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Drive.webp","rating":-1},{"id":3,"name":"Начало","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Inception.webp","rating":3},{"id":7,"name":"Зеленая миля","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheGreenMile.webp","rating":9},{"id":22,"name":"Ла-Ла Лэнд","genre":[{"id":13,"name":"Мюзикл"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/LaLaLand.webp","rating":8},{"id":25,"name":"Поймай меня если сможешь","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/CatchMeIfYouCan.webp","rating":8}]},{"compilation_name":"Драма","movies":[{"id":2,"name":"Титаник","genre":[{"id":5,"name":"Мелодрама"},{"id":9,"name":"История"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Titanic.webp","rating":2},{"id":1,"name":"Аватар","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Avatar.webp","rating":9},{"id":27,"name":"Семь","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Seven.webp","rating":6.2},{"id":10,"name":"Девушка с татуировкой дракона","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheGirlwiththeDragonTattoo.webp","rating":6},{"id":26,"name":"Исчезнувшая","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/GoneGirl.webp","rating":10},{"id":16,"name":"Паразиты","genre":[{"id":3,"name":"Драма"},{"id":8,"name":"Триллер"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Parasites.webp","rating":5.5},{"id":17,"name":"Волк с Уолл-Стрит","genre":[{"id":3,"name":"Драма"},{"id":1,"name":"Комедия"}],"picture":"https://movie-space.ru/api/v1/minio/posters/WolfOfWallStreet.webp","rating":2},{"id":6,"name":"Интерстеллар","genre":[{"id":6,"name":"Фантастика"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Interstellar.webp","rating":6},{"id":28,"name":"Чернобыль","genre":[{"id":3,"name":"Драма"},{"id":9,"name":"История"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Chernobyl.webp","rating":8.7},{"id":13,"name":"Исходный код","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/SourceCode.webp","rating":7},{"id":14,"name":"Доктор Хаус","genre":[{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/HouseMD.webp","rating":9.5},{"id":20,"name":"Отбросы","genre":[{"id":3,"name":"Драма"},{"id":6,"name":"Фантастика"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Misfits.webp","rating":8},{"id":11,"name":"Драйв","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Drive.webp","rating":-1},{"id":3,"name":"Начало","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Inception.webp","rating":3},{"id":18,"name":"Молодой папа","genre":[{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/YoungPope.webp","rating":5.5},{"id":7,"name":"Зеленая миля","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheGreenMile.webp","rating":9},{"id":22,"name":"Ла-Ла Лэнд","genre":[{"id":13,"name":"Мюзикл"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/LaLaLand.webp","rating":8},{"id":25,"name":"Поймай меня если сможешь","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/CatchMeIfYouCan.webp","rating":8}]}];;
                            movCompBody({
                                movCompBody: movieCompilations,
                            });
                        })

                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getFavorites() {
        return new Promise<{movCompBody:Array<MovieCompilationData>}>((movCompBody) => {
            this.favorites()
                .then(({data}) => {
                    data
                        .then((movieCompilations)=>{
                            movCompBody({
                                movCompBody: movieCompilations,
                            });
                        })

                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }


    static getMovieCompilationMovie(id) {
        return new Promise<{movCompBody:MovieCompilationModel}>((movCompBody) => {
            this.movieCompilationMovie(id)
                .then(({data}) => {
                    data
                        .then((movieCompilations)=>{
                            movCompBody({
                                movCompBody: movieCompilations,
                            });
                        })

                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getMovieCompilationPerson(id) {
        return new Promise<{movCompBody:MovieCompilationModel}>((movCompBody) => {
            this.movieCompilationPerson(id)
                .then(({data}) => {
                    data
                        .then((movieCompilations)=>{
                            // movieCompilations= {"compilation_name":"Фильмография","movies":[{"id":2,"name":"Титаник","genre":[{"id":5,"name":"Мелодрама"},{"id":9,"name":"История"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Titanic.webp","rating":4.7},{"id":17,"name":"Волк с Уолл-Стрит","genre":[{"id":3,"name":"Драма"},{"id":1,"name":"Комедия"}],"picture":"https://movie-space.ru/api/v1/minio/posters/WolfOfWallStreet.webp","rating":7.3},{"id":3,"name":"Начало","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Inception.webp","rating":6.5},{"id":25,"name":"Поймай меня если сможешь","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/CatchMeIfYouCan.webp","rating":10}]};
                            movCompBody({
                                movCompBody: movieCompilations,
                            });
                        })

                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getMovies(limit, offset) {
        return new Promise<{movCompBody:MovieCompilationModel}>((movCompBody) => {
            this.allMovies(limit, offset)
                .then(({data}) => {
                    data
                        .then((movieCompilations)=>{
                          //  movieCompilations = [{"id":1,"name":"Аватар","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Avatar.webp","rating":9.5},{"id":8,"name":"Мстители","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":7,"name":"Фэнтези"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheAvengers.webp","rating":6.7},{"id":2,"name":"Титаник","genre":[{"id":5,"name":"Мелодрама"},{"id":9,"name":"История"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Titanic.webp","rating":4.7},{"id":24,"name":"Отель Гранд Будапешт","genre":[{"id":1,"name":"Комедия"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/GrandHotelBudapest.webp","rating":6},{"id":12,"name":"Живая сталь","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":12,"name":"Семейный"}],"picture":"https://movie-space.ru/api/v1/minio/posters/RealSteel.webp","rating":6.3},{"id":23,"name":"Шестое чувство","genre":[{"id":10,"name":"Детектив"},{"id":7,"name":"Фэнтези"}],"picture":"https://movie-space.ru/api/v1/minio/posters/SixFeeling.webp","rating":7.3},{"id":27,"name":"Семь","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Seven.webp","rating":6.8},{"id":10,"name":"Девушка с татуировкой дракона","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheGirlwiththeDragonTattoo.webp","rating":6},{"id":26,"name":"Исчезнувшая","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/GoneGirl.webp","rating":9},{"id":17,"name":"Волк с Уолл-Стрит","genre":[{"id":3,"name":"Драма"},{"id":1,"name":"Комедия"}],"picture":"https://movie-space.ru/api/v1/minio/posters/WolfOfWallStreet.webp","rating":6},{"id":16,"name":"Паразиты","genre":[{"id":3,"name":"Драма"},{"id":8,"name":"Триллер"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Parasites.webp","rating":5.5},{"id":6,"name":"Интерстеллар","genre":[{"id":6,"name":"Фантастика"},{"id":3,"name":"Драма"},{"id":4,"name":"Приключения"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Interstellar.webp","rating":8},{"id":13,"name":"Исходный код","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/SourceCode.webp","rating":7},{"id":21,"name":"Пираты карибского моря","genre":[{"id":7,"name":"Фэнтези"},{"id":2,"name":"Боевик"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Pirates.webp","rating":8.5},{"id":9,"name":"Время","genre":[{"id":6,"name":"Фантастика"},{"id":5,"name":"Мелодрама"},{"id":2,"name":"Боевик"}],"picture":"https://movie-space.ru/api/v1/minio/posters/InTime.webp","rating":8},{"id":11,"name":"Драйв","genre":[{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Drive.webp","rating":8},{"id":3,"name":"Начало","genre":[{"id":6,"name":"Фантастика"},{"id":2,"name":"Боевик"},{"id":8,"name":"Триллер"},{"id":3,"name":"Драма"},{"id":10,"name":"Детектив"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Inception.webp","rating":6.5},{"id":15,"name":"Джентельмены","genre":[{"id":2,"name":"Боевик"},{"id":1,"name":"Комедия"}],"picture":"https://movie-space.ru/api/v1/minio/posters/Gentlemen.webp","rating":8.5},{"id":7,"name":"Зеленая миля","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/TheGreenMile.webp","rating":5.5},{"id":22,"name":"Ла-Ла Лэнд","genre":[{"id":13,"name":"Мюзикл"},{"id":3,"name":"Драма"}],"picture":"https://movie-space.ru/api/v1/minio/posters/LaLaLand.webp","rating":8},{"id":25,"name":"Поймай меня если сможешь","genre":[{"id":3,"name":"Драма"},{"id":11,"name":"Криминал"}],"picture":"https://movie-space.ru/api/v1/minio/posters/CatchMeIfYouCan.webp","rating":9}]
                            movCompBody({
                                movCompBody: movieCompilations,
                            });
                        })
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getSeries() {
        return new Promise<{movCompBody:MovieCompilationModel}>((movCompBody) => {
            this.allSeries()
                .then(({data}) => {
                    data
                        .then((movieCompilations)=>{
                            movCompBody({
                                movCompBody: movieCompilations,
                            });
                        })
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getGenre(id) {
        return new Promise<{movCompBody:MovieCompilationModel}>((movCompBody) => {
            this.allGenre(id)
                .then(({data}) => {
                    data
                        .then((movieCompilations)=>{
                            movCompBody({
                                movCompBody: movieCompilations,
                            });
                        })
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }


}