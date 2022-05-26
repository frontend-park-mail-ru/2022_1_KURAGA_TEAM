export default class LikeService {

    private listeners: Object;

    constructor() {
        this.listeners = {"click": []};
    }

    on(event:string, callback) {    // подписываемся на событие
        this.listeners[event].push(callback)
    }

    off(event:string, callback) {   // отписываемся от события
        this.listeners[event] = this.listeners[event]
            .filter(function (listener) {
                return listener !== callback;
            })
    }

    emit(event:string, data) {      // публикуем (диспатчим, эмитим) событие
        this.listeners[event].forEach(function (listener) {
            listener(data)
        })
    }
}