import actorsTemplate from './actors.pug'

interface Staff {
    staff: object,
}

export default class ActorsClass {
    private readonly staffs: object;

    constructor(staff: Staff) {
        this.staffs = staff.staff;
    }

    render() {
        return actorsTemplate({staffs: this.staffs});
    }
}