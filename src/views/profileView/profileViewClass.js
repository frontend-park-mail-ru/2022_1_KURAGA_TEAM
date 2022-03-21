import profileViewTemplate from './profileView.pug';
import HeaderClass from "Components/header/headerClass.js";
import FooterClass from "Components/footer/footerClass.js";
import handlerLink from "Utils/handlerLink.js";
import InputsProfileClass from "Components/inputs/inputsProfile/inputsProfileClass";
import ButtonClass from "Components/button/buttonClass";
import ProfileAvatarClass from "Components/profileAvatar/profileAvatarClass";
import {profile} from "Modules/network";
import router from "Routing/router";
import { routes } from "Routing/constRouting";

import '../../css/profile.css';

const root = document.getElementById('root');

export default class ProfileViewClass {
    async render() {
        try {
            const {isAuth, data} = await profile();

            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);

                return;
            }

            const res = await data;

            const header = new HeaderClass(res.user.username);
            const inputs = new InputsProfileClass(res.user);
            const avatar = new ProfileAvatarClass();
            const button = new ButtonClass('Редактировать');
            const footer = new FooterClass();

            root.innerHTML = profileViewTemplate({
                header: header.render(),
                inputs: inputs.render(),
                avatar: avatar.render(),
                button: button.render(),
                footer: footer.render()
            });

            handlerLink();
            inputs.setHandler();
            header.setHandler();
        } catch (err) {
            console.error(err);
        }
    }
}