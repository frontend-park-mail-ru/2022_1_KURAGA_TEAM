import offlineTemplate from './offline.pug'
import BaseViewClass from "../baseView/baseViewClass";

import '../../css/offline.scss';

export default class OfflineViewClass extends BaseViewClass {
    render() {
        super.render(offlineTemplate)
    }
}
