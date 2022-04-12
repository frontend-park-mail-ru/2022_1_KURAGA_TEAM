import actorsTemplate from './actors.pug'

interface Staffs {
    staff: Staff,
}

export default class ActorsClass {
    private readonly staffs: object;

    constructor(staff: Staffs) {
        this.staffs = staff.staff;
    }

    render() {
        return actorsTemplate({staffs: this.staffs});
    }
}