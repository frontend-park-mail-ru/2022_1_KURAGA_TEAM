import firstInfoMovie from './firstInfoMovie.pug'

export default class FirstInfoMovieClass {
    #rating

    #description

    constructor(...params) {
        this.#rating = params[0];
        this.#description = params[1];
    }

    render() {
        return firstInfoMovie({
            rating: this.#rating,
            description: this.#description
        });
    }

    setHandlers() {
        const button = document.querySelector('.your-rating__button');
        const error = document.querySelector('.first-part-info__error');

        button.addEventListener('click', () => {
            error.classList.add('first-part-info__error-active');
        })
    }
}