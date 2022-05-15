import firstInfoMovie from "./firstInfoMovie.pug";
import './firstInfoMovie.scss'
import {debounce} from "../../utils/Debounce"
import UserModel from "../../models/User";
export default class FirstInfoMovieClass {
    private readonly rating: number;

    private readonly description: string;

    constructor(rating,{description,}: { rating: number; description: string; }) {
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

        let inputValue = (this.rating*10).toString();
        const rating: HTMLElement = document.getElementById("rating");
        const slider: HTMLElement = document.getElementById("slider");
        slider.style.backgroundSize = inputValue + "%";
        slider.setAttribute("value",inputValue);
        const progress: HTMLElement = document.getElementById("progress-wrapper");
        rating.textContent = (Math.round(parseInt(inputValue) / 10)).toString();
        if (Math.round(parseInt(inputValue) / 10) <= 3) {
            rating.style.color = "var(--font-error-color)";
        } else if (Math.round(parseInt(inputValue) / 10) <= 6) {
            rating.style.color = "#D4E13D";
        } else {
            rating.style.color = "#3BB33B";
        }
        const rat = document.getElementById("rating-bar");
        //rating.addEventListener("input", this.changeRaiting);
        rat.addEventListener("input", this.changeRaiting);



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
