import footerTemplate from "./footer.pug";
import './footer.scss'

const configIcon = [
    {
        key: "telegram",
        href: "https://t.me/movie_space",
        src: "../../static/telegram.png",
    },
    {
        key: "vk",
        href: "https://vk.com/dtarnovsky",
        src: "../../static/vk.png",
    },
];

export default class FooterClass {
    render() {
        return footerTemplate({ items: configIcon });
    }
}
