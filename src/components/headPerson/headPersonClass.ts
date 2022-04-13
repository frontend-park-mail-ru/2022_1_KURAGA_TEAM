import headPersonTemplate from "./headPerson.pug";
import { InfoHeadPerson } from "../../types";
export default class HeadPersonClass {
    private readonly info: InfoHeadPerson;

    constructor(info: InfoHeadPerson) {
        this.info = info;
    }
    render() {
        return headPersonTemplate({
            info: this.info,
        });
    }
}
