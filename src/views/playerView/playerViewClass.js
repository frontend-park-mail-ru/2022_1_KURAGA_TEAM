import playerTemplate from './player.pug';
import BaseViewClass from "../baseView/baseViewClass";
import LoaderViewClass from "../loaderView/loaderViewClass";
import { movie } from "Modules/network";
import { routes } from "Routing/constRouting";
import router from "Routing/router";
import handlerLink from "Utils/handlerLink";

import '../../css/player.css';

export default class PlayerViewClass extends BaseViewClass {
    async render() {
        try {
            const loader = new LoaderViewClass();
            loader.render();

            const id = +/\d+/.exec(window.location.pathname);

            const check = window.location.pathname.indexOf('trailer');

            const mov = await movie(id);

            const movieRes = await mov.data;

            if (movieRes.status === routes.ERROR) {
                router.go(routes.ERROR_VIEW);
                return;
            }

            let video = movieRes.video;
            if (check !== -1) {
                video = movieRes.trailer;
            }

            super.render(playerTemplate, {
                video,
            });

            handlerLink()
        } catch (err) {
            console.error(err);
        }
    }
}