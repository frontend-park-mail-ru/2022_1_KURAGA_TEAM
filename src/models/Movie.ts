import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import {MovieData} from "../types";

export default class MovieModel {
    data: MovieData;

    constructor(movieData: MovieData) {
        this.data = movieData;
    }

    get movieData() {
        return this.data;
    }

    get checkMovie() {
        if (this.movieData.season == null) {
            return true;
        }
        return this.data.is_movie;
    }

    get seasonsData() {
        this.movieData.season.forEach((value, index) => {
            if (value.episodes === null) {
                value.episodes = [{name: "Cерия пока недоступна"}];
            }
        })
        return this.movieData.season;
    }

    get video() {
        return this.data.video;
    }

    get trailer() {
        return this.data.trailer;
    }

    get id() {
        return this.data.id;
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

    static async mainHomeMovie() {
        try {
            return await ajaxReq.get({
                path: "/mainMovie",
            });
        } catch (err) {
            return err;
        }
    }

    static async movie(id) {
        try {
            return await ajaxReq.get({
                path: `/movie/${id}`,
            });
        } catch (err) {
            return err;
        }
    }


    static mainMov() {
        return new Promise<{ movie: MovieData }>((movie) => {
            this.mainHomeMovie()
                .then(({data}) => {
                    data
                        .then((movieBody) => {
                            movie({
                                movie: movieBody
                            })

                        })
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }

    static getMovie(id) {
        const mockSerial =
             [{
                id: 1, number: 1, episodes: [
                    {
                        description: "У воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а потом у неё случился припадок. Её направляют в госпиталь Принстон-Плэйнсборо, где доктор Хаус и его команда (к которой недавно присоединился новый врач Эрик Форман) пытаются поставить ей диагноз. На приём в клинику к доктору Хаусу приходит «оранжевый пациент».",
                        id: 1,
                        name: "Пилотная серия",
                        number: 1,
                        picture: "http://movie-space.ru/api/v1/minio/posters/HouseMD_1_1.webp",
                        video: "http://movie-space.ru/api/v1/minio/series/HouseMD_1_1.mp4"
                    },{
                         description: " к доктору Хаусу приходит «оранжевый пациент».",
                         id: 1,
                         name: "Пилотная серия",
                         number: 1,
                         picture: "http://movie-space.ru/api/v1/minio/posters/HouseMD_1_1.webp",
                         video: "http://movie-space.ru/api/v1/minio/series/HouseMD_1_1.mp4"
                     },
                     {
                         description: "У воспитательницы детского У воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а псада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а потом у неё случился припадок. Её направляют в госпиталь Принстон-Плэйнсборо, где доктор Хаус и его команда (к которой недавно присоединился новый врач Эрик Форман) пытаются поставить ей диагноз. На приём в клинику к доктору Хаусу приходит «оранжевый пациент».",
                         id: 1,
                         name: "Пилотная серия2",
                         number: 1,
                         picture: "http://movie-space.ru/api/v1/minio/posters/HouseMD_1_1.webp",
                         video: "http://movie-space.ru/api/v1/minio/series/HouseMD_1_1.mp4"
                     },
                     {
                         description: "У воспитательницы детского У воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а псада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а потом у неё случился припадок. Её направляют в госпиталь Принстон-Плэйнсборо, где доктор Хаус и его команда (к которой недавно присоединился новый врач Эрик Форман) пытаются поставить ей диагноз. На приём в клинику к доктору Хаусу приходит «оранжевый пациент».",
                         id: 1,
                         name: "Пилотная серия3",
                         number: 1,
                         picture: "http://movie-space.ru/api/v1/minio/posters/HouseMD_1_1.webp",
                         video: "http://movie-space.ru/api/v1/minio/series/HouseMD_1_1.mp4"
                     },
                     {
                         description: "У воспитательницы детского У воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а псада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а пУ воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а потом у неё случился припадок. Её направляют в госпиталь Принстон-Плэйнсборо, где доктор Хаус и его команда (к которой недавно присоединился новый врач Эрик Форман) пытаются поставить ей диагноз. На приём в клинику к доктору Хаусу приходит «оранжевый пациент».",
                         id: 1,
                         name: "Пилотная сери6я",
                         number: 1,
                         picture: "http://movie-space.ru/api/v1/minio/posters/HouseMD_1_1.webp",
                         video: "http://movie-space.ru/api/v1/minio/series/HouseMD_1_1.mp4"
                     }]

            },{id: 2, number: 1, episodes: [
            {
                description: "У воспитательницы детского сада Ребекки Адлер началась афазия во время урока, а потом у неё случился припадок. Её направляют в госпиталь Принстон-Плэйнсборо, где доктор Хаус и его команда (к которой недавно присоединился новый врач Эрик Форман) пытаются поставить ей диагноз. На приём в клинику к доктору Хаусу приходит «оранжевый пациент».",
                id: 2,
                name: "Пилотная2 серия",
                number: 1,
                picture: "http://movie-space.ru/api/v1/minio/posters/HouseMD_1_1.webp",
                video: "http://movie-space.ru/api/v1/minio/series/HouseMD_1_1.mp4"
            }]

    }
            ]

        return new Promise<{ movie: MovieData }>((movie) => {
            this.movie(id)
                .then(({isAuth, data}) => {
                    data
                        .then((movieBody) => {
                            if (isAuth) {
                                console.log(movieBody);
                                movieBody.season = mockSerial;
                                movie({
                                    movie: movieBody,
                                });
                            } else {
                                movie({
                                    movie: null,
                                });
                            }

                        })

                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }


}
