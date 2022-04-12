import { routes } from "Routing/constRouting";
import router from "Routing/router";

export default function MovingCarousel(setting) {


    if (document.querySelector(setting.wrap) === null) {
        router.go(routes.ERROR_CATCH_VIEW);

        return;
    }

    const privates = {};

    this.prev_slide = () => {
        if (privates.opt.position - 1 <= 0) {
            privates.sel.prev.style.visibility = `hidden`;
        } else {
            privates.sel.prev.style.visibility = `visible`;
        }

        privates.opt.position--;
        privates.sel.next.style.visibility = `visible`;
        privates.sel.wrap.style.transform = `translateX(-${privates.opt.position}00%)`;
    };

    this.next_slide = () => {
        privates.opt.position++;
        if (privates.opt.position + 1 >= privates.opt.max_position) {
            privates.sel.next.style.visibility = `hidden`;
        } else {
            privates.sel.next.style.visibility = `visible`;
        }

        if (privates.opt.position >= privates.opt.max_position) {
            --privates.opt.position;
        }
        privates.sel.prev.style.visibility = `visible`;
        privates.sel.wrap.style.transform = `translateX(-${privates.opt.position}00%)`;
    };

    privates.setting = setting;

    privates.sel = {
        main: document.querySelector(privates.setting.main),
        wrap: document.querySelector(privates.setting.wrap),
        children: document.querySelector(privates.setting.wrap).children,
        prev: document.querySelector(privates.setting.prev),
        next: document.querySelector(privates.setting.next),
    };

    privates.opt = {
        position: 0,
        max_position: document.querySelector(privates.setting.wrap).children.length,
    };
    if (privates.opt.max_position > 1) {
        privates.sel.next.style.visibility = `visible`;
    }

    if (privates.sel.prev !== null) {
        privates.sel.prev.addEventListener('click', () => {
            this.prev_slide();
        });
    }

    if (privates.sel.next !== null) {


        privates.sel.next.addEventListener('click', () => {
            this.next_slide();
        });
    }
}
