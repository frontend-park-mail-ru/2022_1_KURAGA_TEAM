'use script'

import {FooterClass} from "./components/footer/footerClass.js";
import {InputNameClass} from "./components/inputs/inputNameClass.js";
import buttonTemplate from "./components/button/button.js";

const root = document.getElementById("root");

const configElement = {
    name: {
        data: "../../static/name.svg",
        placeholder: "Введите Имя",
        type: "text",
        error: "nameError",
    },
    email: {
        data: "../../static/email.svg",
        placeholder: "Введите Почту",
        type: "email",
        error: "emailError",
    },
    passwordFirst: {
        data: "../../static/password.svg",
        placeholder: "Введите Пароль",
        type: "password",
        error: "passOneError",
    },
    passwordSecond: {
        data: "../../static/password.svg",
        placeholder: "Повторите Пароль",
        type: "password",
        error: "passTwoError",
    }
}

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

function createDecor() {
    const back = document.createElement("div");
    back.id = "back";
    root.appendChild(back);

    const logo = document.createElement("object");
    logo.classList.add("logo");
    logo.type = "image/svg+xml";
    logo.data = "../../static/Logo.svg";
    root.appendChild(logo);

    const backMenu = document.createElement("div");
    backMenu.id = "back-menu";
    root.appendChild(backMenu);

    return backMenu
}

const formElements = Object.entries(configElement)
    .map(([key, {data, placeholder, type, error}]) =>
        ({key, data, placeholder, type, error}));

function createMenuReg(backMenu) {
    const menu = document.createElement("div");
    menu.id = "menu";
    backMenu.appendChild(menu);

    const reg = document.createElement("h1")
    reg.classList.add("menu-h1");
    reg.textContent = "Регистрация";
    menu.appendChild(reg);

    const form = document.createElement("form");
    form.method = "post";
    form.classList.add("menu-form");
    form.action = ".";
    form.noValidate = true;
    menu.appendChild(form);

    const inputs = new InputNameClass(form);
    inputs.items = formElements;
    inputs.render();

    form.innerHTML = form.innerHTML + buttonTemplate();

    inputs.setHandler();

    const text = document.createElement("div");
    text.classList.add("text");
    menu.appendChild(text);

    const spanFirst = document.createElement("span");
    spanFirst.classList.add("first-span");
    spanFirst.textContent = "Есть аккаунт?";
    text.appendChild(spanFirst);

    const spanSecond = document.createElement("a");
    spanSecond.href = ".";
    spanSecond.classList.add("second-span");
    spanSecond.textContent = "Войдите";
    text.appendChild(spanSecond);
}

const footerIcons = Object.entries(configIcon).map(([key, {href, src}]) => ({key, href, src}));

function createFooter() {
    const footer = new FooterClass(root);
    footer.items = footerIcons;
    footer.render();
}

function createPage() {
    const backMenu = createDecor();

    createMenuReg(backMenu);

    createFooter();
}

createPage();
