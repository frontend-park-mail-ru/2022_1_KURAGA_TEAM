import actorsTemplate from './actors.pug'

export default class ActorsClass {
    #staff;

    constructor(staff) {
        this.#staff = staff;
    }

    render() {
        return actorsTemplate({staffs: this.#staff});
    }
}