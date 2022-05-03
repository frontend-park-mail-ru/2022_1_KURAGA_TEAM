export function isEmptyMovies(arr) {
    let isEmpty = true;
    arr.forEach(obj => {
        console.log("check NULL", obj.movies, obj.movies != null)
        if (obj.movies != null) {
            console.log("inside");
            isEmpty = false;
        }
    })
    return isEmpty;
}