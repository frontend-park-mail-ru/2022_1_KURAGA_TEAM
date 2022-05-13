export function debounce(func, timeout = 300) {
    let timer;
    return (...args:any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


export function isEmpty(obj) {
    for (let key in obj) {
        if(obj[key] != null){
            return false;
        }
    }
    return true;
}


