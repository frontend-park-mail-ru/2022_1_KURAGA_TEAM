import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import {UserData} from "../types";

export default class UserModel {
    data: UserData;

    constructor(userData: UserData) {
        this.data = userData;
    }

    get userData() {
        return this.data;
    }

    static async registration(form) {
        try {
            return await ajaxReq.post({
                path: "/signup",
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    static async login(form) {
        try {
            return await ajaxReq.post({
                path: "/login",
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    static async logout() {
        try {
            return await ajaxReq.delete({
                path: "/logout",
            });
        } catch (err) {
            return err;
        }
    }

    static async profile() {
        try {
            return await ajaxReq.get({
                path: "/profile",
            });
        } catch (err) {
            return err;
        }
    }

    static async edit(form, csrfToken) {
        try {
            return await ajaxReq.put({
                path: "/edit",
                body: form,
                headers: {
                    "Content-Type": "application/json",
                    "csrf-token": csrfToken,
                },
            });
        } catch (err) {
            return err;
        }
    }

    static async avatar(form, csrfToken) {
        try {
            return await ajaxReq.put({
                path: "/avatar",
                body: form,
                headers: {
                    "csrf-token": csrfToken,
                },
            });
        } catch (err) {
            return err;
        }
    }

    static async search(form) {
        try {
            return await ajaxReq.post({
                path: "/search",
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    static async getSearch() {
        try {
            return await ajaxReq.get({
                path: "/find",
            });
        } catch (err) {
            return err;
        }
    }

    static async token() {
        try {
            return await ajaxReq.get({
                path: "/csrf",
            });
        } catch (err) {
            return err;
        }
    }

    static async like(form, csrfToken) {
        try {
            console.log("like")
            return await ajaxReq.post({
                path: "/like",
                body: form,
                headers: {
                    "Content-Type": "application/json",
                    "csrf-token": csrfToken,
                },
            });
        } catch (err) {
            return err;
        }
    }

    static async dislike(form, csrfToken) {
        try {
            console.log("dislike")
            return await ajaxReq.delete({
                path: "/dislike",
                body: form,
                headers: {
                    "Content-Type": "application/json",
                    "csrf-token": csrfToken,
                },
            });
        } catch (err) {
            return err;
        }
    }

    static auth() {
        return new Promise<{ isAuth: boolean; userBody }>((res) => {
            this.profile()
                .then((body) => {
                    res({
                        isAuth: body.isAuth,
                        userBody: body.data,
                    });
                })
                .catch(() => {
                });
        });
    }

    static quit() {
        return new Promise((res) => {
            this.logout()
                .then(() => {
                    router.go(routes.LOGIN_VIEW);
                })
                .catch((err) => {
                    router.go(routes.ERROR_CATCH_VIEW);
                });
        });
    }


    static reg(formJson) {
        const errorIncorr = document.querySelector(
            'div[data-section="incorrect"]'
        );

        this.registration(formJson)
            .then(({isAuth, data}) => {
                data.then((res) => {
                    if (res.message === "ERROR: Email is not unique") {
                        errorIncorr.classList.add("error-active");
                        errorIncorr.classList.add("center");
                        errorIncorr.textContent =
                            "Такой пользователь уже существует";

                        return;
                    }

                    if (!isAuth) {
                        errorIncorr.classList.add("error-active");
                        errorIncorr.classList.add("center");
                        errorIncorr.textContent =
                            "Упс... У нас что-то пошло не так!";

                        return;
                    }

                    router.go("/");
                });
            })
            .catch((err) => {
                router.go(routes.ERROR_CATCH_VIEW);
            });
    }

    static log(formJson) {
        const errorIncorr = document.querySelector(
            'div[data-section="incorrect"]'
        );

        this.login(formJson)
            .then(({isAuth}) => {
                if (!isAuth) {
                    errorIncorr.classList.add("error-active");
                    errorIncorr.classList.add("center");
                    errorIncorr.textContent = "Неверный логин или пароль";

                    return;
                }

                router.go("/");
            })
            .catch((err) => {
                router.go(routes.ERROR_CATCH_VIEW);
            });
    }

    static async editProfile(formJson) {
        try {
            const {data} = await this.token();

            const {message} = await data;

            return this.edit(formJson, message);
        } catch (err) {
            return err;
        }
    }

    static async editAvatar(formData) {
        try {
            const {data} = await this.token();

            const {message} = await data;

            return this.avatar(formData, message);
        } catch (err) {
            return err;
        }
    }

    static async allLikes() {
        try {
            return await ajaxReq.get({
                path: `/likes`,
            });
        } catch (err) {
            return err;
        }
    }

    static getSearchMainRes(formData) {
        const mainRes = document.getElementById("res");

        this.search(formData)
            .then(({isAuth, data}) => {
                data.then((res) => {

                    mainRes.textContent = formData.get("search");

                });
            })
            .catch((err) => {
                router.go(routes.ERROR_CATCH_VIEW);
            });
    }

    static getSearchRes() {
        return new Promise((searchRes) => {
            this.getSearch()
                .then((body) => {
                    const result = {
                        categories: [{
                            topic: "Фильмы",
                            results: [{name: "Мстители", info: "жанр", id: 1}, {
                                name: "Мстители2",
                                info: "жанр2",
                                id: 2
                            }]
                        }, {
                            topic: "Сериалы",
                            results: [{name: "Мстители", info: "жанр", id: 2}, {
                                name: "Мстители2",
                                info: "жанр2",
                                id: 4
                            }]
                        }, {
                            topic: "Персоны",
                            results: [{name: "Мстители", info: "жанр", id: 3}, {
                                name: "Мстители2",
                                info: "жанр2",
                                id: 1
                            }]
                        }
                        ]
                    }
                    const fulfilled = Promise.resolve(result);
                    body = {
                        isAuth: true,
                        data: fulfilled,
                    }
                    searchRes({
                        isAuth: body.isAuth,
                        searchBody: body.data,
                    });
                })
                .catch((err) => {
                    router.go(routes.ERROR_CATCH_VIEW);
                });
        });
    }

    static async liked(formJson) {
        try {

            const {data} = await this.token();
            const {message} = await data;

            return this.like(formJson, message);


        } catch (err) {
            return err;
        }
    }

    static async disliked(formJson) {
        try {

            const {data} = await this.token();
            const {message} = await data;

            return this.dislike(formJson, message);


        } catch (err) {
            return err;
        }
    }

    static getLikes() {
        return new Promise<{ isAuth: boolean; likesBody }>((likes) => {
            this.allLikes()
                .then((body) => {
                    likes({
                        isAuth: body.isAuth,
                        likesBody: body.data,
                    });
                })
                .catch((err) => {
                    router.go(routes.ERROR_CATCH_VIEW);
                });
        });
    }

    setHandler(): void {
        const likes = document.querySelectorAll(".like");
        console.log(likes);
        likes.forEach((like: HTMLElement) => {
            like.onclick = function (this) {
                let formJson = JSON.stringify({
                    id: Number(like.id.split('_').pop()),
                });
                console.log(formJson, like.id.split('_').pop());
                if (like.classList.contains("active-like")) {
                    UserModel.disliked(formJson);
                } else {
                    console.log("likeeee");
                    UserModel.liked(formJson);
                }
                const similarLikes = document.querySelectorAll("#" + like.id);
                similarLikes.forEach((like: HTMLElement) => {
                    like.classList.toggle("active-like");
                })
            };

        });
    }

    setAllLikes(likesId) {
        const unique = likesId.filter(function(item, pos) {
            return likesId.indexOf(item) == pos;
        })
        unique.forEach((i) => {
            console.log(i,"#like_" + i)
            const similarLikes = document.querySelectorAll("#like_" + i);
            similarLikes.forEach((like: HTMLElement) => {
                like.classList.toggle("active-like");
            })
        });
    }


}



