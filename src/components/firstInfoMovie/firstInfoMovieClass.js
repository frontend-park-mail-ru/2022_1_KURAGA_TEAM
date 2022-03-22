import firstInfoMovie from './firstInfoMovie.pug'

export default class FirstInfoMovieClass {
    #rating

    #description

    constructor({rating, description}) {
        this.#rating = rating;
        this.#description = description;
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