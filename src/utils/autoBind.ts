export default class AutoBind{
    private binded: any;
    private bindedEvent: any;
    private bindedStyle: any;

    constructor(parentSelector : string = "#root") {
        this.binded = [...document.querySelector(parentSelector).querySelectorAll('[data-bind]')]
            .map((el:HTMLElement) => ({
                el,
                prop: el.dataset['bind'].split(':')[0],
                variable: el.dataset['bind'].split(':')[1],
            }));
        this.bindedEvent = [...document.querySelector(parentSelector).querySelectorAll('[data-bind-event]')]
            .map((el:HTMLElement) => ({
                el,
                prop: el.dataset['bindEvent'].split(':')[0],
                variable: el.dataset['bindEvent'].split(':')[1],
            }));

        this.bindedStyle = [...document.querySelector(parentSelector).querySelectorAll('[data-bind-style]')]
            .map((el:HTMLElement) => ({
                el,
                prop: el.dataset['bindStyle'].split(':')[0],
                variable: el.dataset['bindStyle'].split(':')[1],
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

    getVariableEvent(name) {
        const entry = this.bindedEvent.find(({variable}) => variable === name);
        return entry ? entry.el[entry.prop] : undefined;
    }
    setVariableEvent(name, value) {
        this.bindedEvent.forEach((entry) => {
            if (entry.variable === name) {
                entry.el[entry.prop] = value;
            }
        });
    }
    
    getVariableStyle(name) {
        const entry = this.bindedStyle.find(({variable}) => variable === name);
        return entry ? entry.el.style[entry.prop] : undefined;

    }
    setVariableStyle(name, value) {
        this.bindedStyle.forEach((entry) => {
            if (entry.variable === name) {
                entry.el.style[entry.prop] = value;
            }
        });
    }

}
