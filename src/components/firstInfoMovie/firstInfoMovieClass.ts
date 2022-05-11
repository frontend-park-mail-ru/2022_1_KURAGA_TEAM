import firstInfoMovie from "./firstInfoMovie.pug";
import './firstInfoMovie.scss'

export default class FirstInfoMovieClass {
    private readonly rating: number;

    private readonly description: string;

    constructor({
        rating,
        description,
    }: {
        rating: number;
        description: string;
    }) {
        this.rating = rating;
        this.description = description;
    }

    render() {
        return firstInfoMovie({
            rating: this.rating,
            description: this.description,
        });
    }

    setHandlers(): void {
        const button = document.querySelector(".your-rating__button");
        const error = document.querySelector(".first-part-info__error");

        button.addEventListener("click", () => {
            if (error.classList.length === 2) {
                error.classList.remove("first-part-info__error-active");

                return;
            }

            error.classList.add("first-part-info__error-active");
        });
    }
    setHandlerMovie():void{
        const info:HTMLElement = document.querySelector(".first-part-info");
        info.style.marginTop = "0";
    }
}
