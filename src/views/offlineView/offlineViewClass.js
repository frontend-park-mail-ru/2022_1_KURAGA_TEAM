import offlineTemplate from './offline.pug'
import BaseViewClass from "../baseView/baseViewClass";
import FooterClass from "Components/footer/footerClass";

import '../../css/offline.scss';

export default class OfflineViewClass extends BaseViewClass {
    render() {
        const footer = new FooterClass();

        super.render(offlineTemplate, {
            footer: footer.render(),
        })
    }
}
