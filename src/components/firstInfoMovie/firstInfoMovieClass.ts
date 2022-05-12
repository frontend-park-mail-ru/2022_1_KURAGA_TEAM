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
        // const button = document.querySelector(".your-rating__button");
        // const error = document.querySelector(".first-part-info__error");
        //
        // button.addEventListener("click", () => {
        //     if (error.classList.length === 2) {
        //         error.classList.remove("first-part-info__error-active");
        //
        //         return;
        //     }
        //
        //     error.classList.add("first-part-info__error-active");
        // });


        const raiting = document.getElementById("rating-bar");



        raiting.addEventListener("input", this.changeRaiting);


    }

    changeRaiting() {
        const rating: HTMLElement = document.getElementById("rating");
        const slider: HTMLElement = document.getElementById("slider");
        let inputValue = (<HTMLInputElement>slider).value;
        slider.style.backgroundSize = inputValue + "%";
        const progress: HTMLElement = document.getElementById("progress-wrapper");
        rating.textContent = (Math.round(parseInt(inputValue) / 10)).toString();
        if (Math.round(parseInt(inputValue) / 10) <= 3) {
            rating.style.color = "var(--font-error-color)";
        } else if (Math.round(parseInt(inputValue) / 10) <= 6) {
            rating.style.color = "#D4E13D";
        } else {
            rating.style.color = "#3BB33B";
        }
    }

    setHandlerMovie(): void {
        const info: HTMLElement = document.querySelector(".first-part-info");
        info.style.marginTop = "0";
    }
}
