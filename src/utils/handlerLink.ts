import router from '../routing/router';

/**
 * Функция находит все элементы-ссылки на странице и навешивает на них обработчик клика, по которому
 * осуществляется переход на другую страницу
 *
 * @function handlerLink
 * */

export default function handlerLink(): void {
    Array.from(document.getElementsByTagName('a')).forEach((item) => {
        if (item.className === "ref") {
            return;
        }

        item.addEventListener('click', (e) => {
            e.preventDefault();

            router.go(item.pathname);
        });
    });
}
