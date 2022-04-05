import offlineTemplate from './offline.pug'
import BaseViewClass from "../baseView/baseViewClass";

import './offline.scss';

class offlineViewClass extends BaseViewClass {
    render() {
        super.render(offlineTemplate)
    }
}

const offline = new offlineViewClass();
offline.render();
