import { ajaxReq } from "Modules/ajax";
import router from "Routing/router.ts";
import { routes } from "Routing/constRouting";
import { PersonData } from "../types";
export default class PersonModel {
    data: PersonData;

    constructor(personData: PersonData) {
        this.data = personData;
    }

    get personData() {
        return this.data;
    }

    static async person(id) {
        try {
            return await ajaxReq.get({
                path: `/person/${id}`,
            });
        } catch (err) {
            return err;
        }
    }

    static getPerson(id) {
        return new Promise<{ person: PersonData }>((person) => {
            this.person(id)
                .then(({data}) => {
                    data
                        .then((personData)=>{
                            person({
                                person: personData,
                            });
                        })

                })
                .catch((err) => {
                    console.error(err)
                });
        });
    }
}
