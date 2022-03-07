import footerTemplate from "./footer.js";

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

export class FooterClass {
    render() {
        const footerIcons = Object.entries(configIcon).map(([key, {href, src}]) => ({key, href, src}));

        return footerTemplate(footerIcons);
    }
}