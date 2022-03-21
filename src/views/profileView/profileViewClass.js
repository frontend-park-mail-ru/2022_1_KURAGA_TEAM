import profileViewTemplate from './profileView.pug';
import HeaderClass from "../../components/header/headerClass.js";
import FooterClass from "../../components/footer/footerClass.js";
import handlerLink from "../../utils/handlerLink.js";
import InputsProfileClass from "../../components/inputs/inputsProfile/inputsProfileClass";
import ButtonClass from "../../components/button/buttonClass";
import ProfileAvatarClass from "../../components/profileAvatar/profileAvatarClass";
import {profile} from "../../modules/network";
import router from "../../routing/router";

import '../../css/profile.css';

const LOGIN_VIEW = '/login';
const root = document.getElementById('root');

export default class ProfileViewClass {
    render() {
        profile()
            .then(({isAuth, data}) => {
                if (!isAuth) {
                    router.go(LOGIN_VIEW);

                    return;
                }
                data.then((res) => {
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
                })
            })
            .catch((err) => {
                console.error(err);
            });
    }
}