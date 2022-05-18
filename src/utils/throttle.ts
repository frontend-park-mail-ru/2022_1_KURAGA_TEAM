export function throttle(callback, time) {
    var shouldCall = true;	// throttled function should atleast be called immediately
    return function() {
        if(shouldCall) {
            callback();
            shouldCall = false;
            setTimeout(function() {
                shouldCall = true
            }, time);
        }
    };
}