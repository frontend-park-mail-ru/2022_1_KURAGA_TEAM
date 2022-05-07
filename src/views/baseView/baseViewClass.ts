const root = document.getElementById("root");

export default class BaseViewClass {
    render(template, props: any = "") {

        window.scrollTo(0, 0);
        root.innerHTML = template(props);
    }
    unmount():void{

    }
    
}
