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


    static async rating(form, csrfToken) {
        try {
            return await ajaxReq.post({
                path: "/addMovieRating",
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

    static async userRating(id) {
        try {
            return await ajaxReq.get({
                path: `/userRating?movie_id=${id}`,
            });
        } catch (err) {
            return err;
        }
    }

    static async paymentToken() {
        try {
            return await ajaxReq.get({
                path: "/payments/token",
            });
        } catch (err) {
            return err;
        }
    }

    static async payment(csrfToken, paymentToken) {
        try {
            const payJson = {
                token: paymentToken
            }

            return await ajaxReq.post({
                path: "/payment",
                body: JSON.stringify(payJson),
                headers: {
                    "Content-Type": "application/json",
                    "csrf-token": csrfToken,
                },
            });
        } catch (err) {
            return err;
        }
    }

    static async subscription(paymentToken) {
        try {
            const data = {
                receiver: '4100117805464162',
                'quickpay-form': 'shop',
                paymentType: 'AC',
                targets: 'Подписка на MovieSpace',
                sum: 2,
                label: paymentToken,
                successURL: `movie-space.ru`
            }

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://yoomoney.ru/quickpay/confirm.xml';
            form.enctype = 'application/x-www-form-urlencoded';

            Object.entries(data).forEach(([key, value]) => {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = String(value);

                if (typeof (value) === 'number') {
                    hiddenField.setAttribute('data-type', 'number');
                }

                form.appendChild(hiddenField);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (err) {
            return err;
        }
    }

    static async getToken() {
        try {
            const {data} = await this.token();

            const {message} = await data;

             return message;
        } catch (err) {
            return err;
        }
    }

    static async getPayToken() {
        try {
            const {data} = await this.paymentToken();

            const {message} = await data;

            return message;
        } catch (err) {
            return err;
        }
    }

    static async pay(csrfToken, payToken) {
        try {
            return this.payment(csrfToken, payToken);
        } catch (err) {
            return err;
        }
    }

    static auth() {
        return new Promise<{ user: UserData }>((res) => {
            this.profile()
                .then(({isAuth, isErr, data}) => {
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
                .catch((err) => {
                    console.error(err);
                });
        })


    }

    static quit() {
        return new Promise(() => {
            this.logout()
                .then((data) => {
                    if (!data.isError) {
                        router.go(routes.LOGIN_VIEW);
                    } else console.error("quitError");
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
        return new Promise<{ isAuth: boolean; regBody }>((res) => {
            this.login(formJson)
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
        return new Promise<{ likesData }>((likes) => {
            this.allLikes()
                .then(({isAuth,data}) => {
                    data
                        .then((body)=>{

                            likes({
                                likesData: body,
                            });
                        })
                })
                .catch(() => {
                });
        });
    }

    static async changeRating(formJson) {
        try {

            const {data} = await this.token();
            const {message} = await data;

            return new Promise<{ generalRating }>((ratingRes) => {
                this.rating(formJson, message)
                    .then(({data})=>{
                        data.then((body)=>{
                            ratingRes({
                                generalRating: body.message,
                            })

                        })
                    })
                    .catch(() => {
                    });
            })


        } catch (err) {
            return err;
        }
    }

    static getRating(id) {
        return new Promise<{ ratingBody }>((rating) => {
            this.userRating(id)
                .then(({isAuth, data}) => {
                    data
                        .then((reg) => {
                            rating({
                                ratingBody: reg,
                            });
                        })
                })
                .catch(() => {
                });
        });
    }


}



