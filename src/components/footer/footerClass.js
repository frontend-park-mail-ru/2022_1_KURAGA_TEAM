import footerTemplate from "./footer.js";

const configIcon = [
    {
        key: "telegram",
        href: "/",
        src: "../../static/telegram.png",
    },
    {
        key: "instagram",
        href: "https://www.instagram.com/danyatarnovskiy/",
        src: "../../static/insta.png",
    },
    {
        key: "vk",
        href: "https://vk.com/dtarnovsky",
        src: "../../static/vk.png",
    }
];

export class FooterClass {
    render() {
        return footerTemplate(configIcon);
    }
}