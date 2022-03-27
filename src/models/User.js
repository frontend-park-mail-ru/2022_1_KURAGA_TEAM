import { ajaxReq } from '../modules/ajax.js';
import router from '../routing/router.js';
import { routes } from '../routing/constRouting.js';

export default class UserModel {
    email;
    nickname;
    avatar;


    async registration(form) {
        try {
            return await ajaxReq.post({
                path: '/signup',
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    async login(form) {
        try {
            return await ajaxReq.post({
                path: '/login',
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    async logout() {
        try {
            return await ajaxReq.delete({
                path: '/logout',
            });
        } catch (err) {
            return err;
        }
    }



     async profile() {
        try {
            return await ajaxReq.get({
                path: '/profile',
            });
        } catch (err) {
            return err;
        }
    }

    async edit(form) {
        try {
            return await ajaxReq.put({
                path: '/edit',
                body: form,
            });
        } catch (err) {
            return err;
        }
    }

    async avatar(form) {
        try {
            return await ajaxReq.put({
                path: '/avatar',
                body: form,
                headers: {
                }
            });
        } catch (err) {
            return err;
        }
    }



    static auth(){
        return new Promise((res) => {
            this.prototype.profile()
                .then((body) => {
                     res({
                         isAuth: body.isAuth,
                         body: body.data
                     });
                })
                .catch(() => {
                });
        });
    }

    static quit(){
        return new Promise((res) => {
            this.prototype.logout()
                .then(() => {
                    router.go(routes.LOGIN_VIEW);
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

    static reg(formJson){
        this.prototype.registration(formJson)
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
                console.error(err);
            });
    }

    static login(formJson){
        this.prototype.login(formJson)
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
                console.error(err);
            });
    }

    static editProfile(formJson){
        return this.prototype.edit(formJson);

    }

    static editAvatar(formData){
        return this.prototype.avatar(formData);
    }


}