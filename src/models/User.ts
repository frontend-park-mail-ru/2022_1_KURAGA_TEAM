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


    static async search(form, csrfToken) {
        try {
            return await ajaxReq.post({
                path: "/find",
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
        return new Promise<{ user: UserData }>((res) => {
            this.profile()
                .then(({isAuth, data}) => {
                    data
                        .then((userBody) => {
                            if (isAuth) {
                                res({
                                    user: userBody.user,
                                })
                            } else res({
                                user: null,
                            });
                        })


                })
                .catch(() => {
                });
        })


    }

    static quit() {
        return new Promise((res) => {
            this.logout()
                .then(() => {
                    router.go(routes.LOGIN_VIEW);
                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }


    static reg(formJson) {
        return new Promise<{ isAuth: boolean; regBody }>((res) => {
            this.registration(formJson)
                .then(({isAuth, data}) => {
                    data
                        .then((reg) => {
                            res({
                                isAuth: isAuth,
                                regBody: reg,
                            });
                        })

                })
                .catch((err) => {
                    console.error(err)
                });
        });

    }

    static log(formJson) {
        return new Promise<{ isAuth: boolean; }>((res) => {
            this.login(formJson)
                .then((body) => {
                    res({
                        isAuth: body.isAuth,
                    });
                })
                .catch((err) => {
                    console.error(err)
                });
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

    static async getSearchRes(formJson) {


        const {data} = await this.token();
        const {message} = await data;

        return new Promise<{ isAuth: boolean; searchBody }>((search) => {
            this.search(formJson, message)
                .then((body) => {
                    search({
                        isAuth: body.isAuth,
                        searchBody: body.data,
                    });
                })
                .catch((err) => {
                    console.error(err)
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
                .catch(() => {
                });
        });
    }


}



