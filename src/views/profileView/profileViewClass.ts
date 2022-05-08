import profileViewTemplate from "./profileView.pug";
import HeaderClass from "Components/header/headerClass";
import FooterClass from "Components/footer/footerClass.ts";
import handlerLink from "Utils/handlerLink.ts";
import InputsProfileClass from "Components/inputs/inputsProfile/inputsProfileClass";
import ButtonClass from "Components/button/buttonClass";
import ProfileAvatarClass from "Components/profileAvatar/profileAvatarClass";
import UserModel from "../../models/User";
import router from "Routing/router";
import { routes } from "Routing/constRouting";
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import { User } from "../../types";

import "./profile.scss";

export default class ProfileViewClass extends BaseViewClass {
    private user: UserModel;

    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const {user} = await UserModel.auth();
            if (!user) {
                router.go(routes.LOGIN_VIEW);
                return;
            }
            this.user = new UserModel(user);

            const header = new HeaderClass(this.user.userData);
            const inputs = new InputsProfileClass(this.user.userData.username);
            const avatar = new ProfileAvatarClass(this.user.userData.avatar);
            const button = new ButtonClass("Сохранить");
            const footer = new FooterClass();

            super.render(profileViewTemplate, {
                header: header.render(),
                inputs: inputs.render(),
                avatar: avatar.render(),
                button: button.render(),
                footer: footer.render(),
            });

            handlerLink();
            this.setHandler();
            inputs.setHandler();
            header.setHandler();
        } catch {
            router.go(routes.ERROR_CATCH_VIEW);
        }
    }

    setHandler(): void {
        const profileNavbar: HTMLAnchorElement =
            document.querySelector(".name-profile");

        profileNavbar.style.backgroundColor = "#2C51B1";
        profileNavbar.style.webkitBackgroundClip = "text";
        profileNavbar.style.webkitTextFillColor = "transparent";
        profileNavbar.style.backgroundImage =
            "linear-gradient(180deg, #BD4CA1 20%, #2C51B1 100%)";
    }
    unmount(){

    }
}
