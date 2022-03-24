import loaderViewTemplate from './loader.pug';

import './loader.css';

const root = document.getElementById('root');

export default class LoaderViewClass {
    render() {
        root.innerHTML = loaderViewTemplate();
    }
}