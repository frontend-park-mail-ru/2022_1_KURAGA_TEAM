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
                            // personData = {"id":10,"name":"Леонардо ДиКаприо","photo":"https://movie-space.ru/api/v1/minio/persons/LeoDiCaprio.webp","addit_photo_1":"https://movie-space.ru/api/v1/minio/persons/LeoDiCaprio1.webp","addit_photo_2":"https://movie-space.ru/api/v1/minio/persons/LeoDiCaprio2.webp","description":"Родился 11 ноября 1974 г. Американский актёр, продюсер и общественный деятель. Лауреат многочисленных наград, включая премию «Оскар», BAFTA, премию Гильдии киноактёров США, три премии «Золотой глобус», а также «Серебряного медведя» Берлинского кинофестиваля.","position":["Актер","Продюсер","Актер","Актер"]}
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
