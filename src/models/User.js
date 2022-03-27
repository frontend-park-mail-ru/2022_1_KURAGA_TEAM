import { ajaxReq } from '../modules/ajax.js';


export default class UserModel {
    email;
    nickname;
    avatar;

     async profile() {
        try {
            return await ajaxReq.get({
                path: '/profile',
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


}