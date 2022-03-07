import router from "../routing/router.js";

export function setHandler() {
    Array.from(document.getElementsByTagName('a')).forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            router.go(item.pathname);
        })
    });
}