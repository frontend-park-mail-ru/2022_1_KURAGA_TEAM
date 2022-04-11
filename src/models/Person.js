import { ajaxReq } from 'Modules/ajax';
import router from 'Routing/router.ts';
import { routes } from 'Routing/constRouting';

export default class PersonModel {
    constructor(personData) {

        this.data = {
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
        return this.data;
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
                    router.go(routes.ERROR_CATCH_VIEW);
                });
        });

    }
}