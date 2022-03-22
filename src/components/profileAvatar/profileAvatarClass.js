import profileAvatarTemplate from './profileAvatar.pug';

export default class ProfileAvatarClass {
    #avatar;

    constructor(avatar) {
        this.#avatar = avatar;
        console.log(avatar)
    }

    render() {
        return profileAvatarTemplate({avatar: this.#avatar});
    }

}