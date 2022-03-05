import carouselFamTemplate from "./carouselFam.js";

export class CarouselFamClass {
    render() {


        const Movies = [
            {
                href: "/",
                name: "Звездные войны1",
                genre: "Фантастика1"
            },
            {
                href: "/",
                name: "Звездные войны2",
                genre: "Фантастика2"
            },
            {
                href: "/",
                name: "Звездные войны3",
                genre: "Фантастика3"
            },
            {
                href: "/",
                name: "Звездные войны4",
                genre: "Фантастика4"
            }
        ];

        return carouselFamTemplate(Movies);
    }

    setHandler(){
        (function () {
            "use strict";

            function Carousel(setting) {
                if (document.querySelector(setting.wrap) === null) {
                    console.error(`Carousel not fount selector ${setting.wrap}`);
                    return;
                }

                /* Scope privates methods and properties */
                let privates = {};


                /* Public methods */
                // Prev slide
                this.prev_slide = () => {
                    --privates.opt.position;

                    if (privates.opt.position < 0) {
                        privates.sel.wrap.classList.add('s-notransition');
                        privates.opt.position = privates.opt.max_position - 1;
                    }

                    privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
                };


                // Next slide
                this.next_slide = () => {
                    ++privates.opt.position;

                    if (privates.opt.position >= privates.opt.max_position) {
                        privates.opt.position = 0;
                    }

                    privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
                };


                /* Privates properties */
                privates.setting = setting;

                privates.sel = {
                    "main": document.querySelector(privates.setting.main),
                    "wrap": document.querySelector(privates.setting.wrap),
                    "children": document.querySelector(privates.setting.wrap).children,
                    "prev": document.querySelector(privates.setting.prev),
                    "next": document.querySelector(privates.setting.next)
                };

                privates.opt = {
                    "position": 0,
                    "max_position": document.querySelector(privates.setting.wrap).children.length
                };

                // Control
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
            let a = new Carousel({
                "main": ".js-carouselFam",
                "wrap": ".js-carouselFam__wrap",
                "prev": ".js-carouselFam__prev",
                "next": ".js-carouselFam__next"
            });



        })();
    }
}