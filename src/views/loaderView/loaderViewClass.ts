import loaderViewTemplate from './loader.pug';

import './loader.scss';

const root = document.getElementById('root');

export default class LoaderViewClass {
    render() {
        root.innerHTML = loaderViewTemplate();
    }
}
