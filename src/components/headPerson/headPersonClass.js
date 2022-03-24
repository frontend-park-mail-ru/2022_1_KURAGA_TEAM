import headPersonTemplate from './headPerson.pug'

export default class HeadPersonClass {
    #info;

    constructor(info) {
        this.#info = info
    }

    render() {
        return headPersonTemplate({
            info: this.#info
        });
    }
}