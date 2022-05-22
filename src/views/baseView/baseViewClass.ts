const root = document.getElementById("root");

export default abstract class BaseViewClass {
    render(template, props: any = "") {

        window.scrollTo(0, 0);
        root.innerHTML = template(props);

    }

    abstract unmount(): void

}
