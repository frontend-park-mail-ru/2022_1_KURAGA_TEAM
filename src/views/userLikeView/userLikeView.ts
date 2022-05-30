import {ajaxReq} from "Modules/ajax";
import router from "Routing/router.ts";
import {routes} from "Routing/constRouting";
import {UserData} from "../../types";
import UserModel from "../../models/User";
import likeService from "./likeService"
import AutoBind from "Utils/autoBind"

export default class UserLikeView {

    static setHandler(): void {

        const likes = document.querySelectorAll(".like");

        const service = new likeService();

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


    static async setAllLikes(likesId) {
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

    static deleteLikes() {
        const autoBind = new AutoBind(".selection");

        const likes = document.querySelectorAll(".like.active-like");

        likes.forEach(like => {
            const id = like.id.split('_').pop();
            autoBind.setVariableEvent("dislike"+id,()=>{
                const movie = document.getElementById(id);
                //movie.classList.add("hidden");
                autoBind.setVariable("hiddenMovie"+id,true);
                let formJson = JSON.stringify({
                    id: Number(id),
                });
                UserModel.disliked(formJson);
            })
            // like.addEventListener("click", ()=>{
            // });
            //autoBind.setVariableEvent("dislike"+id,()=>{});
            // like.removeEventListener("click", ()=>{
            //
            //     const id = like.id.split('_').pop();
            //
            //     console.log(like.id.split('_').pop());
            //     const movie = document.getElementById(id);
            //     movie.classList.add("hidden");
            //
            //     let formJson = JSON.stringify({
            //         id: Number(id),
            //     });
            //     UserModel.disliked(formJson);
            // });
        })

    }

}