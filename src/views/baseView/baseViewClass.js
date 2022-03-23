const root = document.getElementById('root');

export default class BaseViewClass {

    render(template, props) {
        root.innerHTML = template(props);
    }
}
