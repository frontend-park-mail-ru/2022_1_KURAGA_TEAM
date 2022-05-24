import {routes} from "Routing/constRouting";
import router from "Routing/router";
import {
    movingCarouselData,
    privatesMovingCarousel,
    selInfo,
    optInfo,
} from "../../types";
import AutoBind from "Utils/autoBind"

export default function MovingCarousel(setting: movingCarouselData) {

    if (document.querySelector(setting.wrap) === null) {
        return;
    }

    this.prev_slide = (isWheel?: boolean) => {
        if (0 == privates.opt.position) {
            return;
        }
        const numMovies = Math.floor(window.screen.width / (privates.opt.length + 20) * privates.opt.max_position);
        if (isWheel) {
            privates.opt.position-=0.25;
            privates.sel.wrap.style.transform = `translateX(-${(privates.opt.length / privates.opt.max_position) * privates.opt.position}px)`;
        } else {
            if (!Number.isInteger(privates.opt.position)){
                privates.opt.position = Math.ceil(privates.opt.position);
            }
            if (privates.opt.position >= numMovies) {
                privates.opt.position -= numMovies;
                privates.sel.wrap.style.transform = `translateX(-${(privates.opt.length / privates.opt.max_position) * privates.opt.position}px)`;
            } else {
                privates.opt.position--;
                privates.sel.wrap.style.transform = `translateX(-${((privates.opt.length / privates.opt.max_position)) * privates.opt.position}px)`;
            }
        }


        if (privates.opt.position <= 0) {
            privates.sel.prev.style.visibility = "hidden";
        } else {

            privates.sel.prev.style.visibility = "visible";
        }


        privates.sel.next.style.visibility = "visible";
        // console.log(window.screen.width,privates.opt.length,privates.opt.max_position,privates.opt.max_position - window.screen.width/privates.opt.length*privates.opt.max_position)
        // reason? // privates.sel.wrap.style.transform = `translateX(-${((privates.opt.length / privates.opt.max_position)) * privates.opt.position}px)`;
    };

    this.next_slide = (isWheel?: boolean) => {
        console.log(privates.opt.max_position, privates.opt.position);
        const numMovies = Math.floor(window.screen.width / privates.opt.length * privates.opt.max_position);
        if (privates.opt.max_position - numMovies == privates.opt.position) {
            return;
        }


        if (numMovies === privates.opt.max_position) {
             privates.sel.next.style.visibility = "hidden";
             privates.sel.prev.style.visibility = "hidden";
        } else {


            if (isWheel) {
                privates.opt.position+=0.25;
                privates.sel.wrap.style.transform = `translateX(-${(privates.opt.length / privates.opt.max_position) * privates.opt.position}px)`;
            } else {
                if (!Number.isInteger(privates.opt.position)){
                    privates.opt.position = Math.ceil(privates.opt.position);
                }

                if (privates.opt.max_position - privates.opt.position >= 2 * numMovies) {
                    privates.opt.position += numMovies;
                    privates.sel.wrap.style.transform = `translateX(-${(privates.opt.length / privates.opt.max_position) * privates.opt.position}px)`;
                } else {
                    privates.opt.position++;
                    privates.sel.wrap.style.transform = `translateX(-${(privates.opt.length / privates.opt.max_position) * privates.opt.position}px)`;

                }
            }
            if (privates.opt.max_position - numMovies <= privates.opt.position) {

                privates.sel.next.style.visibility = "hidden";
            } else {

                privates.sel.next.style.visibility = "visible";
            }

            privates.sel.prev.style.visibility = "visible";
        }


    };


    const privates: privatesMovingCarousel = {setting};

    privates.sel = {
        main: document.querySelector(privates.setting.main),
        wrap: document.querySelector(privates.setting.wrap),
        children: document.querySelector(privates.setting.wrap).children,
        prev: document.querySelector(privates.setting.prev),
        next: document.querySelector(privates.setting.next),
    };

    privates.opt = {
        length: privates.sel.wrap.offsetWidth,
        position: 0,
        max_position: document.querySelector(privates.setting.wrap).children.length,
    };
    if (privates.opt.max_position > 1) {
        privates.sel.next.style.visibility = "visible";
    }
    if(privates.opt.position == 0){
        privates.sel.prev.style.visibility = "hidden";
    }

    if (privates.sel.prev !== null) {
        privates.sel.prev.addEventListener("click", () => {
            this.prev_slide();
        });
    }

    if (privates.sel.next !== null) {
        privates.sel.next.addEventListener("click", () => {
            this.next_slide();
        });
    }
    privates.sel.main.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY;

        if (delta > 0) {
            this.next_slide(true);
        } else {
            this.prev_slide(true);
        }

    })


}
