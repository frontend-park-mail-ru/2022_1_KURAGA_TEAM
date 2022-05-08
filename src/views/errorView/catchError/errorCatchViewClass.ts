import FooterClass from "Components/footer/footerClass.ts";
import errorViewTemplate from "./error.pug";
import BaseViewClass from "../../baseView/baseViewClass";
import ButtonClass from "Components/button/buttonClass.ts";

import "./error.scss";

export default class ErrorCatchViewClass extends BaseViewClass {
    render() {
        const footer = new FooterClass();
        const button = new ButtonClass("Вернуться на главную");

        super.render(errorViewTemplate, {
            button: button.render(),
            footer: footer.render(),
        });
    }

    unmount() {
    }
}
