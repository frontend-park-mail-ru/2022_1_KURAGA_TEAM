import profileAvatarTemplate from "./profileAvatar.pug";
import './profileAvatar.scss'

export default class ProfileAvatarClass {
    private readonly avatar: string;

    constructor(avatar: string) {
        this.avatar = avatar;
    }

    render() {
        return profileAvatarTemplate({ avatar: this.avatar });
    }
}
