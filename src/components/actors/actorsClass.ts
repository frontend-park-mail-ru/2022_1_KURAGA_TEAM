import actorsTemplate from './actors.pug'

export default class ActorsClass {
    private readonly staffs: Staff;

    constructor(staff: Staffs) {
        this.staffs = staff.staff;
    }

    render() {
        return actorsTemplate({staffs: this.staffs});
    }
}