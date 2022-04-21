import { routes } from "Routing/constRouting";
import router from "Routing/router";
import {
    movingCarouselData,
    privatesMovingCarousel,
    selInfo,
    optInfo,
} from "../../types";

export default function MovingCarousel(setting: movingCarouselData) {
    if (document.querySelector(setting.wrap) === null) {
        router.go(routes.ERROR_CATCH_VIEW);

        return;
    }

    this.prev_slide = () => {
        if (privates.opt.position - 1 <= 0) {
            privates.sel.prev.style.visibility = "hidden";
        } else {
            privates.sel.prev.style.visibility = "visible";
        }

        privates.opt.position--;
        privates.sel.next.style.visibility = "visible";



        privates.sel.wrap.style.transform = `translateX(-${(privates.opt.length/privates.opt.max_position)*privates.opt.position}px)`;
    };

    this.next_slide = () => {
        privates.opt.position++;
        if (privates.opt.position >= privates.opt.max_position - window.screen.width/privates.opt.length*privates.opt.max_position) {
            privates.sel.next.style.visibility = "hidden";
        } else {
            privates.sel.next.style.visibility = "visible";
        }


        privates.sel.wrap.style.transform = `translateX(-${(privates.opt.length/privates.opt.max_position)*privates.opt.position}px)`;

        // if (privates.opt.position >= privates.opt.max_position) {
        //     --privates.opt.position;
        // }

        privates.sel.prev.style.visibility = "visible";

    };

    const privates: privatesMovingCarousel = { setting };

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

    if (privates.sel.prev !== null) {
        privates.sel.prev.addEventListener("click", () => {
            console.log(privates.sel.wrap.offsetWidth);
            this.prev_slide();
        });
    }

    if (privates.sel.next !== null) {
        privates.sel.next.addEventListener("click", () => {
            this.next_slide();
        });
    }
}