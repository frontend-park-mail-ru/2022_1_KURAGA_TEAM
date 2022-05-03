import actorsTemplate from "./actors.pug";
import { Staff, Staffs } from "../../types";
import './actors.scss'

export default class ActorsClass {
    private readonly staffs: Staff;

    constructor(staff: Staffs) {
        this.staffs = staff.staff;
    }

    render() {
        return actorsTemplate({ staffs: this.staffs });
    }
}
