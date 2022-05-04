import footerTemplate from "./footer.pug";
import './footer.scss'

const configIcon = [
    {
        key: "telegram",
        href: "/",
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
