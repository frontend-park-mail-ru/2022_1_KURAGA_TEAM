import headPersonTemplate from './headPerson.pug'

export default class HeadPersonClass {
    private readonly info: object;

    constructor(info: object) {
        this.info = info
    }

    render() {
        return headPersonTemplate({
            info: this.info
        });
    }
}