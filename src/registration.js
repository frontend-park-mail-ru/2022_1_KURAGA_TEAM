'use script'

import {FooterClass} from "./components/footer/footerClass.js";
import template from "./components/button/button.js";

const root = document.getElementById("root");

const configElement = {
    name: {
        data: "../../static/name.svg",
        placeholder: "Введите Имя",
        type: "text",
    },
    email: {
        data: "../../static/email.svg",
        placeholder: "Введите Почту",
        type: "email",
    },
    passwordFirst: {
        data: "../../static/password.svg",
        placeholder: "Введите Пароль",
        type: "password",
    },
    passwordSecond: {
        data: "../../static/password.svg",
        placeholder: "Повторите Пароль",
        type: "password",
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

function createPage() {
    const backMenu = createDecor();

    createMenuReg(backMenu);

    createFooter();
}

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



    function createInputs() {
        let objElem = Object
            .entries(configElement)
            .map(([key, {data, placeholder, type}]) => {
                const menuElement = document.createElement("div");
                menuElement.dataset.section = key;
                menuElement.classList.add("element");
                form.appendChild(menuElement);

                const menuSvg = document.createElement("object");
                menuSvg.classList.add("svg");
                menuSvg.type = "image/svg+xml";
                menuSvg.data = data
                menuElement.appendChild(menuSvg);

                const menuInput = document.createElement("input");
                menuInput.placeholder = placeholder
                menuInput.classList.add("menu-input");
                menuInput.type = type
                menuInput.required = true;
                menuInput.dataset.section = key;
                menuElement.appendChild(menuInput);

                const menuError = document.createElement("div");
                menuError.classList.add("error");

                return {menuError, menuInput, menuElement};
            });
        objElem.forEach((element) => {
            if (element.menuInput.dataset.section === "name") {
                element.menuInput.addEventListener('change', () => {

                    if (element.menuInput.value.trim() === "") {
                        nameError();

                        return;
                    }

                    if (element.menuInput.validity.valid) {
                        form.removeChild(element.menuError);

                        return;
                    }

                    nameError();
                });

                element.menuInput.addEventListener('keydown', () => {
                    form.removeChild(element.menuError);
                });

                return
            }

            if (element.menuInput.dataset.section === "email") {
                element.menuInput.addEventListener('change', () => {
                    if (element.menuInput.validity.valid) {
                        form.removeChild(element.menuError);

                        return;
                    }

                    emailError();
                });

                element.menuInput.addEventListener('keydown', () => {
                    form.removeChild(element.menuError);
                });

                return
            }

            if (element.menuInput.dataset.section === "passwordFirst") {
                element.menuInput.addEventListener('change', () => {
                    const containsLetters = /^.*[a-zA-Z]+.*$/;
                    const minimum8Chars = /^.{8,}$/;
                    const containsNumbers = /^.*[0-9]+.*$/;

                    if (element.menuInput.validity.valid &&
                        containsNumbers.test(element.menuInput.value) &&
                        containsLetters.test(element.menuInput.value) &&
                        minimum8Chars.test(element.menuInput.value)) {
                        form.removeChild(element.menuError);

                        return;
                    }

                    passOneError();
                });

                element.menuInput.addEventListener('keydown', () => {
                    form.removeChild(element.menuError);
                });

                return
            }

            if (element.menuInput.dataset.section === "passwordSecond") {
                element.menuInput.addEventListener('change', () => {
                    if (element.menuInput.validity.valid) {
                        form.removeChild(element.menuError);

                        return;
                    }

                    passTwoError();
                });

                element.menuInput.addEventListener('keydown', () => {
                    form.removeChild(element.menuError);
                });
            }
        });

        return objElem;
    }

    let objElements = createInputs();

    function nameError() {
            form.insertBefore(objElements[0].menuError, objElements[1].menuElement);
            objElements[0].menuError.textContent = 'Заполните поле';
    }

    function emailError() {
        if(objElements[1].menuInput.validity.valueMissing) {
            form.insertBefore(objElements[1].menuError, objElements[2].menuElement);
            objElements[1].menuError.textContent = 'Заполните поле';

            return;
        }

        if(objElements[1].menuInput.validity.typeMismatch) {
            form.insertBefore(objElements[1].menuError, objElements[2].menuElement);
            objElements[1].menuError.textContent = 'Введите действительный email';
        }
    }

    function passOneError() {
        form.insertBefore(objElements[2].menuError, objElements[3].menuElement);
        objElements[2].menuError.innerText = 'Пароль должен содержать не менее 8-ми символов,' +
            '\n в том числе цифры и латинские буквы';
    }

    function passTwoError() {
        if(objElements[3].menuInput.validity.valueMissing) {
            form.insertBefore(objElements[3].menuError, button);
            objElements[3].menuError.textContent = 'Заполните поле';
        }
    }

    form.innerHTML += template();

    form.addEventListener('submit', (e) => {
        console.log(1)
        if(!objElements[0].menuInput.validity.valid || objElements[0].menuInput.value.trim() === "") {
            nameError();

            e.preventDefault();
        }

        if(!objElements[1].menuInput.validity.valid) {
            emailError();

            e.preventDefault();
        }

        const containsLetters = /^.*[a-zA-Z]+.*$/;
        const minimum8Chars = /^.{8,}$/;
        const containsNumbers = /^.*[0-9]+.*$/;

        if(!objElements[2].menuInput.validity.valid ||
            !containsNumbers.test(objElements[2].menuInput.value) &&
            !containsLetters.test(objElements[2].menuInput.value) &&
            !minimum8Chars.test(objElements[2].menuInput.value)) {
            passOneError();

            e.preventDefault();
        }

        if(objElements[3].menuInput.value !== objElements[2].menuInput.value) {
            form.insertBefore(objElements[3].menuError, button);
            objElements[3].menuError.textContent = 'Пароли не совпадают';

            e.preventDefault();
        }

        if(!objElements[3].menuInput.validity.valid) {
            passTwoError();

            e.preventDefault();
        }
    });

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

createPage();
