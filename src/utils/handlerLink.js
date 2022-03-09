import router from '../routing/router.js';

/**
 * Функция находит все элементы-ссылки на странице и навешивает на них обработчик клика, по которому
 * осуществляется переход на другую страницу
 *
 * @function handlerLink
 * */

export default function handlerLink() {
    Array.from(document.getElementsByTagName('a')).forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            router.go(item.pathname);
        });
    });
}
