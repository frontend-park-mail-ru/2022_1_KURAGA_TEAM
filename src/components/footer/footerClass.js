import footerTemplate from "./footer.js";

export class FooterClass {
    render() {
        const configIcon = {
        telegram: {
            href: "/",
            src: "../../static/telegram.png",
        },
        instagram: {
            href: "https://www.instagram.com/danyatarnovskiy/",
            src: "../../static/insta.png",
        },
        vk: {
            href: "https://vk.com/dtarnovsky",
            src: "../../static/vk.png",
        }
        };

        const footerIcons = Object.entries(configIcon).map(([key, {href, src}]) => ({key, href, src}));

        return footerTemplate(footerIcons);
    }
}