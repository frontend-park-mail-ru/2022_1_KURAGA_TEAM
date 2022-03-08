import router from "../routing/router.js";

export function handlerLink() {
    Array.from(document.getElementsByTagName('a')).forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            router.go(item.pathname);
        })
    });
}