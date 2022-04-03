import profileViewTemplate from './profileView.pug';
import HeaderClass from "Components/header/headerClass.js";
import FooterClass from "Components/footer/footerClass.js";
import handlerLink from "Utils/handlerLink.js";
import InputsProfileClass from "Components/inputs/inputsProfile/inputsProfileClass";
import ButtonClass from "Components/button/buttonClass";
import ProfileAvatarClass from "Components/profileAvatar/profileAvatarClass";
import UserModel from "../../models/User.js"
import router from "Routing/router";
import { routes } from "Routing/constRouting";
import BaseViewClass from '../baseView/baseViewClass.js';
import LoaderViewClass from "../loaderView/loaderViewClass.js";

import '../../css/profile.scss';

export default class ProfileViewClass  extends BaseViewClass{
    #user;
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();


            const {isAuth, userBody} = await UserModel.auth();
            if (!isAuth) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            console.log(userBody);
            const userData = await Promise.resolve(userBody);
            this.#user = new UserModel(userData.user);



            const header = new HeaderClass(this.#user.userData);
            const inputs = new InputsProfileClass(userData.user);
            const avatar = new ProfileAvatarClass(userData.user.avatar);
            const button = new ButtonClass('Сохранить');
            const footer = new FooterClass();

            super.render(profileViewTemplate,{
                header: header.render(),
                inputs: inputs.render(),
                avatar: avatar.render(),
                button: button.render(),
                footer: footer.render()
            });
            

            handlerLink();
            this.setHandler();
            inputs.setHandler();
            header.setHandler();
        } catch (err) {
            console.error(err);
        }
    }

    setHandler() {
        const profileNavbar = document.querySelector('.name-profile');

        profileNavbar.style.backgroundColor = '#2C51B1';
        profileNavbar.style.webkitBackgroundClip = 'text';
        profileNavbar.style.webkitTextFillColor = 'transparent';
        profileNavbar.style.backgroundImage = 'linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)';
    }
}