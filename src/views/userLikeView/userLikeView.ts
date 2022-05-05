import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import {UserData} from "../../types";
import UserModel from "../../models/User";
import likeService from "./likeService"

export default class UserLikeView {


    static setHandler(): void {

        const likes = document.querySelectorAll(".like");

        const service:likeService = new likeService();

        const likeClick = function (like: HTMLElement) {
            let formJson = JSON.stringify({
                id: Number(like.id.split('_').pop()),
            });

            if (like.classList.contains("active-like")) {
                UserModel.disliked(formJson);

            } else {

                UserModel.liked(formJson);
            }
            const similarLikes = document.querySelectorAll("#" + like.id);
            similarLikes.forEach((like: HTMLElement) => {
                like.classList.toggle("active-like");
            })
        };

        service.on('click', likeClick);
        likes.forEach((like: HTMLElement) => {
            like.addEventListener("click", () => {
                service.emit('click', like);
                // service.off('click', likeClick);
            })
            // like.onclick = function () {
            //     let formJson = JSON.stringify({
            //         id: Number(like.id.split('_').pop()),
            //     });
            //
            //     if (like.classList.contains("active-like")) {
            //         UserModel.disliked(formJson);
            //
            //     } else {
            //
            //         UserModel.liked(formJson);
            //     }
            //     const similarLikes = document.querySelectorAll("#" + like.id);
            //     similarLikes.forEach((like: HTMLElement) => {
            //         like.classList.toggle("active-like");
            //     })
            // };
        });

    }


    static setAllLikes(likesId) {
        if (!likesId) {
            return;
        }
        const unique = likesId.filter(function (item, pos) {
            return likesId.indexOf(item) == pos;
        })
        unique.forEach((i) => {
            const similarLikes = document.querySelectorAll("#like_" + i);
            similarLikes.forEach((like: HTMLElement) => {
                like.classList.toggle("active-like");
            })
        });
    }
}