import firstInfoMovie from "./firstInfoMovie.pug";
import './firstInfoMovie.scss'
import {debounce} from "Utils/Debounce"
import {throttle} from "Utils/throttle"
import UserModel from "../../models/User";
import AutoBind from "Utils/autoBind"

export default class FirstInfoMovieClass {
    private readonly rating: number;
    private autoBind;
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

    setHandler(): void {

        this.autoBind = new AutoBind(".first-part-info");
        console.log(this.autoBind);
        this.changeRating();



        this.autoBind.setVariable("setRating",this.changeRating.bind(this));
        this.autoBind.setVariableEvent("changeRating",debounce(async()=>{
            const id = +/\d+/.exec(window.location.pathname);
            const rating: HTMLElement = document.getElementById("rating");
            const formJson = JSON.stringify({
                rating: rating.textContent.toString(),
                id: id
            });
            UserModel.changeRating(formJson);

        },500))



    }

    changeRating() {
        const rating: HTMLElement = document.getElementById("rating");
        const slider = document.getElementById("slider");
        let inputValue = (<HTMLInputElement>slider).value;
        this.autoBind.setVariableStyle("backSizeSlider",inputValue + "%")
        const progress: HTMLElement = document.getElementById("progress-wrapper");
        console.log(Math.round(parseInt(inputValue) / 10));
        if (Math.round(parseInt(inputValue) / 10) == 0) {
            rating.textContent = "1";
        } else {
            rating.textContent = (Math.round(parseInt(inputValue) / 10)).toString();
        }
        if (Math.round(parseInt(inputValue) / 10) <= 3) {
            this.autoBind.setVariableStyle("colorRating","var(--font-error-color)");
        } else if (Math.round(parseInt(inputValue) / 10) <= 6) {
            this.autoBind.setVariableStyle("colorRating","var(--font-warning-color)");
        } else {
            this.autoBind.setVariableStyle("colorRating","var(--font-correct-color)");

        }
    }



    // setHandlerMovie(): void {
    //     // this.autoBind.setVariableStyle("marginInfo",0);
    //     // const info: HTMLElement = document.querySelector(".first-part-info");
    //     // info.style.marginTop = "0";
    // }
}
