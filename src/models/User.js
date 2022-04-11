import { ajaxReq } from 'Modules/ajax';
import router from 'Routing/router.ts';
import { routes } from 'Routing/constRouting';

export default class UserModel {
    constructor(userData) {
        this.data = {
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar
        }
    }

    get userData(){
        return this.data;
    }

    static async registration(form) {
        try {
            return await ajaxReq.post({
                path: '/signup',
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    static async login(form) {
        try {
            return await ajaxReq.post({
                path: '/login',
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    static async logout() {
        try {
            return await ajaxReq.delete({
                path: '/logout',
            });
        } catch (err) {
            return err;
        }
    }



     static async profile() {
        try {
            return await ajaxReq.get({
                path: '/profile',
            });
        } catch (err) {
            return err;
        }
    }

    static async edit(form, csrfToken) {
        try {
            return await ajaxReq.put({
                path: '/edit',
                body: form,
                headers: {
                    'Content-Type': 'application/json',
                    'csrf-token': csrfToken
                }
            });
        } catch (err) {
            return err;
        }
    }

    static async avatar(form, csrfToken) {
        try {
            return await ajaxReq.put({
                path: '/avatar',
                body: form,
                headers: {
                    'csrf-token': csrfToken
                }
            });
        } catch (err) {
            return err;
        }
    }

    static async token() {
        try {
            return await ajaxReq.get({
                path: '/csrf',
            });
        } catch (err) {
            return err;
        }
    }

    static auth(){
        return new Promise((res) => {
            this.profile()
                .then((body) => {
                     res({
                         isAuth: body.isAuth,
                         userBody: body.data
                     });
                })
                .catch(() => {
                });
        });
    }

    static quit(){
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

    static reg(formJson){
        const errorIncorr = document.querySelector('div[data-section="incorrect"]');

        this.registration(formJson)
            .then(({ isAuth, data }) => {
                data.then((res) => {
                    if (res.message === 'ERROR: Email is not unique') {
                        errorIncorr.classList.add('error-active');
                        errorIncorr.classList.add('center');
                        errorIncorr.textContent = 'Такой пользователь уже существует';

                        return;
                    }

                    if (!isAuth) {
                        errorIncorr.classList.add('error-active');
                        errorIncorr.classList.add('center');
                        errorIncorr.textContent = 'Упс... У нас что-то пошло не так!';

                        return;
                    }

                    router.go('/');
                });
            })
            .catch((err) => {
                router.go(routes.ERROR_CATCH_VIEW);
            });
    }

    static log(formJson) {
        const errorIncorr = document.querySelector('div[data-section="incorrect"]');

        this.login(formJson)
            .then(({ isAuth }) => {
                if (!isAuth) {
                    errorIncorr.classList.add('error-active');
                    errorIncorr.classList.add('center');
                    errorIncorr.textContent = 'Неверный логин или пароль';

                    return;
                }

                router.go('/');
            })
            .catch((err) => {
                router.go(routes.ERROR_CATCH_VIEW);
            });
    }

    static async editProfile(formJson) {
        try {
            const { data } = await this.token();

            const { message } = await data;

            return this.edit(formJson, message);
        } catch (err) {
            return err;
        }
    }

    static async editAvatar(formData) {
        try {
            const { data } = await this.token();

            const { message } = await data;

            return this.avatar(formData, message);
        } catch (err) {
            return err;
        }
    }


}

