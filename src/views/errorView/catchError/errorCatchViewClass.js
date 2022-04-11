import errorViewTemplate from './error.pug'
import FooterClass from "Components/footer/footerClass.js";
import BaseViewClass from '../../baseView/baseViewClass.js';

import './error.scss';

export default class ErrorCatchViewClass extends BaseViewClass{
     render() {
        const footer = new FooterClass();

        super.render(errorViewTemplate,{
            footer: footer.render()
        });
    }
}