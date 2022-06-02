import headPersonTemplate from "./headPerson.pug";
import {InfoHeadPerson} from "../../types";
import './headPerson.scss'
import AutoBind from "Utils/autoBind"

export default class HeadPersonClass {
    private readonly info: InfoHeadPerson;

    constructor(info: InfoHeadPerson) {
        this.info = info;
    }

    render() {
        this.info.position = this.info.position.filter((element: string, index) => {
            return this.info.position.indexOf(element) === index;
        });
        return headPersonTemplate({
            info: this.info,
        });
    }

    setHandler() {
        const autoBind = new AutoBind(".head-person");
        autoBind.setVariableEvent("clickAddit1", () => {
                autoBind.setVariable("addAddit1", this.changeBack(autoBind.getVariable("addAddit1")));
            }
        )
        autoBind.setVariableEvent("clickAddit2", () => {
                autoBind.setVariable("addAddit2", this.changeBack(autoBind.getVariable("addAddit2")));
            }
        )

    }

    changeBack(photo: string): string {
        const back: HTMLElement = document.querySelector(".photo-person");
        const backPhoto = back.style.backgroundImage.slice(4, -1).replace(/"/g, "");
        console.log(photo);
        back.style.backgroundImage = `url(\"${photo}\")`
        return backPhoto;
    }
}
