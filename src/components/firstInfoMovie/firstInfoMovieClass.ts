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
        //this.autoBind.setVariableStyle("colorRating", "var(--font-color)");
        this.setRating();

        this.autoBind.setVariable("setRating", this.changeRating.bind(this));
        // const ratingBar = document.getElementById("rating-bar");
        //ratingBar.addEventListener("click",this.changeRating.bind(this));
        this.autoBind.setVariableEvent("changeRating", debounce(async () => {
            const id = +/\d+/.exec(window.location.pathname);
            const rating: HTMLElement = document.getElementById("rating");
            let formJson;
            if(rating.textContent == "–"){
                
                formJson = JSON.stringify({
                    rating: "-1",
                    id: id.toString()
                });
            } else {
                formJson = JSON.stringify({
                    rating: rating.textContent,
                    id: id.toString()
                });
            }
            const {generalRating} = await UserModel.changeRating(formJson);
            document.querySelector(".our-rating").textContent = generalRating;
            this.autoBind.setVariableStyle("fixRatingShadow", "0 5px 8px var(--mix-color)");
        }, 500))

        // if(window.screen.width < 1000){
        //     document.getElementById("rating-bar").addEventListener("ontouchend",debounce(async () => {
        //         const id = +/\d+/.exec(window.location.pathname);
        //         const rating: HTMLElement = document.getElementById("rating");
        //         let formJson;
        //         if(rating.textContent == "–"){
        //
        //             formJson = JSON.stringify({
        //                 rating: "-1",
        //                 id: id.toString()
        //             });
        //         } else {
        //             formJson = JSON.stringify({
        //                 rating: rating.textContent,
        //                 id: id.toString()
        //             });
        //         }
        //         const {generalRating} = await UserModel.changeRating(formJson);
        //         document.querySelector(".our-rating").textContent = generalRating;
        //         this.autoBind.setVariableStyle("fixRatingShadow", "0 5px 8px var(--mix-color)");
        //     }, 500))
        // }


    }

    setRating() {

        const rating: HTMLElement = document.getElementById("rating");
        const slider = document.getElementById("slider");
        let inputValue = (<HTMLInputElement>slider).value;
        let valueRating = Math.round(parseInt(inputValue) / 10);
        if (rating.textContent != `–`) {
            valueRating = Number(rating.textContent);
            inputValue = (valueRating * 10).toString();
            (<HTMLInputElement>slider).value = (valueRating * 10).toString();
            this.autoBind.setVariableStyle("fixRatingShadow", "0 5px 8px var(--mix-color)");
            this.autoBind.setVariableStyle("backSizeSlider", inputValue + "%");
        }else{
            this.autoBind.setVariableStyle("colorRating", "var(--font-color)");
        }


    }

    changeRating() {

        const rating: HTMLElement = document.getElementById("rating");
        const slider = document.getElementById("slider");
        let inputValue = (<HTMLInputElement>slider).value;
        let valueRating = Math.round(parseInt(inputValue) / 10);


        this.autoBind.setVariableStyle("fixRatingShadow", "");
        this.autoBind.setVariableStyle("backSizeSlider", inputValue + "%")

        const progress: HTMLElement = document.getElementById("progress-wrapper");

        if (valueRating == 0) {
            rating.textContent = "–";
            this.autoBind.setVariableStyle("colorRating", "var(--font-color)");
        } else {
            rating.textContent = (valueRating).toString();
        }

        this.setColorRating();
    }

    setColorRating() {

        //const valueRating = Math.round(parseInt((<HTMLInputElement>document.getElementById("slider")).value) / 10);
        const rating  = document.getElementById("rating").textContent;
        if (rating == '–') {
            this.autoBind.setVariableStyle("colorRating", "var(--font-color)");
        } else if (Number(rating) <= 3) {
            this.autoBind.setVariableStyle("colorRating", "var(--font-error-color)");
        } else if (Number(rating) <= 6) {
            this.autoBind.setVariableStyle("colorRating", "var(--font-warning-color)");
        } else {
            this.autoBind.setVariableStyle("colorRating", "var(--font-correct-color)");
        }


    }


    // setHandlerMovie(): void {
    //     // this.autoBind.setVariableStyle("marginInfo",0);
    //     // const info: HTMLElement = document.querySelector(".first-part-info");
    //     // info.style.marginTop = "0";
    // }
}
