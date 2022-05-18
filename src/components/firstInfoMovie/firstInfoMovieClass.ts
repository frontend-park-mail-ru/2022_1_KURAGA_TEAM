import firstInfoMovie from "./firstInfoMovie.pug";
import './firstInfoMovie.scss'
import {debounce} from "Utils/Debounce"
import {throttle} from "Utils/throttle"
import UserModel from "../../models/User";

export default class FirstInfoMovieClass {
    private readonly rating: number;

    private readonly description: string;

    constructor(rating, {description,}: { rating: number; description: string; }) {
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


        let inputValue = (this.rating * 10).toString();
        const rating: HTMLElement = document.getElementById("rating");
        const slider: HTMLElement = document.getElementById("slider");
        slider.style.backgroundSize = parseInt(inputValue) + "%";
        slider.setAttribute("value", inputValue);
        const progress: HTMLElement = document.getElementById("progress-wrapper");


        if (Math.round(parseInt(inputValue) / 10) <= 3) {
            rating.style.color = "var(--font-error-color)";
        } else if (Math.round(parseInt(inputValue) / 10) <= 6) {
            rating.style.color = "#D4E13D";
        } else {
            rating.style.color = "#3BB33B";
        }
        const rat = document.getElementById("rating-bar");
        //rating.addEventListener("input", this.changeRaiting);
        rat.addEventListener("input",this.changeRating.bind(this));
        rat.addEventListener("mousedown",debounce(async()=>{
            const id = +/\d+/.exec(window.location.pathname);
            const rating: HTMLElement = document.getElementById("rating");
            const formJson = JSON.stringify({
                rating: rating.textContent.toString(),
                id: id
            });
            console.log(formJson);
            UserModel.changeRating(formJson);
            console.log("e");
        },500))


    }

    changeRating() {
        const rating: HTMLElement = document.getElementById("rating");
        const slider: HTMLElement = document.getElementById("slider");
        let inputValue = (<HTMLInputElement>slider).value;
        slider.style.backgroundSize = inputValue + "%";
        const progress: HTMLElement = document.getElementById("progress-wrapper");
        console.log(Math.round(parseInt(inputValue) / 10));
        if (Math.round(parseInt(inputValue) / 10) == 0) {
            rating.textContent = "1";
        } else {
            rating.textContent = (Math.round(parseInt(inputValue) / 10)).toString();
        }
        if (Math.round(parseInt(inputValue) / 10) <= 3) {
            rating.style.color = "var(--font-error-color)";
        } else if (Math.round(parseInt(inputValue) / 10) <= 6) {
            rating.style.color = "#D4E13D";
        } else {
            rating.style.color = "#3BB33B";
        }
       // debounce(this.sendRating, 1000)();

    }

    sendRating(): void {

    }


    setHandlerMovie(): void {
        const info: HTMLElement = document.querySelector(".first-part-info");
        info.style.marginTop = "0";
    }
}
