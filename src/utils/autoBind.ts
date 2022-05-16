export default class AutoBind{
    private binded:any;

    constructor() {

        this.binded = [...document.querySelector(".root").querySelectorAll('[data-bind]')]
            .map((el:SVGElement | HTMLElement) => ({
                el,
                prop: el.dataset['bind'].split(':')[0],
                variable: el.dataset['bind'].split(':')[1],
            }));

    }
    getVariable(name) {
        const entry = this.binded.find(({variable}) => variable === name);
        return entry ? entry.el[entry.prop] : undefined;
    }
    setVariable(name, value) {
        this.binded.forEach((entry) => {
            if (entry.variable === name) {
                entry.el[entry.prop] = value;
            }
        });
    }
    setStyle(name,value){
        const entry = this.binded.find(({variable}) => variable === name);
        entry.el.attributeStyleMap.set(name, value);
    }
}