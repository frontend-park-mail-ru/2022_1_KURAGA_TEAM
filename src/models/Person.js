import { ajaxReq } from '../modules/ajax.js';
import router from '../routing/router.js';
import { routes } from '../routing/constRouting.js';

export default class PersonModel {
    constructor(personData) {

        this.personData = {
            addit_photo_1: personData.addit_photo_1,
            addit_photo_2: personData.addit_photo_2,
            description: personData.description,
            id: personData.id,
            name: personData.name,
            photo: personData.photo,
            position: personData.position
        }
    }

    get personData() {
        return this._p;
    }

    set personData(data) {
        this._p = {
            addit_photo_1: data.addit_photo_1,
            addit_photo_2: data.addit_photo_2,
            description: data.description,
            id: data.id,
            name: data.name,
            photo: data.photo,
            position: data.position
        }
    }


    static async person(id) {
        try {
            return await ajaxReq.get({
                path: '/person/' + id,
            });
        } catch (err) {
            return err;
        }
    }

    static getPerson(id) {
        return new Promise((person) => {
            this.person(id)
                .then((body) => {
                    person({
                        isAuth: body.isAuth,
                        persBody: body.data
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        });

    }
}