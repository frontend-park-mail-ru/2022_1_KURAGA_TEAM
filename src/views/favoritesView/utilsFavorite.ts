export function isEmptyMovies(arr) {
    let isEmpty = true;
    arr.forEach(obj => {
        if (obj.movies != null) {
            isEmpty = false;
        }
    })
    return isEmpty;
}