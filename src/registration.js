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

    const inputName = document.querySelector('input[data-section="name"]');
    const errorName = document.querySelector('[data-section="nameError"]');
    form.removeChild(errorName);

    const inputEmail = document.querySelector('input[data-section="email"]');
    const errorEmail = document.querySelector('div[data-section="emailError"]');
    form.removeChild(errorEmail);

    const inputPassOne = document.querySelector('input[data-section="passwordFirst"]');
    const errorPassOne = document.querySelector('div[data-section="passOneError"]');
    form.removeChild(errorPassOne);

    const inputPassTwo = document.querySelector('input[data-section="passwordSecond"]');
    const errorPassTwo = document.querySelector('div[data-section="passTwoError"]');
    form.removeChild(errorPassTwo);

    form.innerHTML = form.innerHTML + buttonTemplate();

    function nameError() {
        form.insertBefore(errorName, inputEmail);
        errorName.textContent = 'Заполните поле';
    }

    function emailError() {
        if(inputEmail.validity.valueMissing) {
            form.insertBefore(errorEmail, inputPassOne);
            errorEmail.textContent = 'Заполните поле';

            return;
        }

        if(inputEmail.validity.typeMismatch) {
            form.insertBefore(errorEmail, inputPassOne);
            errorEmail.textContent = 'Введите действительный email';
        }
    }

    function passOneError() {
        form.insertBefore(errorPassOne, inputPassTwo);
        errorPassOne.innerText = 'Пароль должен содержать не менее 8-ми символов,' +
            '\n в том числе цифры и латинские буквы';
    }

    function passTwoError() {
        if(errorPassTwo.validity.valueMissing) {
            form.insertBefore(errorPassTwo, buttonTemplate);
            errorPassTwo.textContent = 'Заполните поле';
        }
    }

    inputName.addEventListener('change', () => {
        if (inputName.value.trim() === "") {
            nameError();

            return;
        }

        if (inputName.validity.valid) {
            form.removeChild(errorName);

            return;
        }

        nameError();
    });

    inputName.addEventListener('keydown', () => {
        form.removeChild(errorName);
    });

    inputEmail.addEventListener('change', () => {
        console.log(1)
        if (inputEmail.validity.valid) {
            form.removeChild(errorEmail);

            return;
        }

        emailError();
    });

    inputEmail.addEventListener('keydown', () => {
        form.removeChild(errorEmail);
    });

    inputPassOne.addEventListener('change', () => {
        const containsLetters = /^.*[a-zA-Z]+.*$/;
        const minimum8Chars = /^.{8,}$/;
        const containsNumbers = /^.*[0-9]+.*$/;

        if (inputPassOne.validity.valid &&
            containsNumbers.test(inputPassOne.value) &&
            containsLetters.test(inputPassOne.value) &&
            minimum8Chars.test(inputPassOne.value)) {
            form.removeChild(errorPassOne);

            return;
        }

        passOneError();
    });

    inputPassOne.addEventListener('keydown', () => {
        form.removeChild(errorPassOne);
    });

    inputPassTwo.addEventListener('change', () => {
        if (inputPassTwo.validity.valid) {
            form.removeChild(errorPassTwo);

            return;
        }

        passTwoError();
    });

    inputPassTwo.addEventListener('keydown', () => {
        form.removeChild(errorPassTwo);
    });

    form.addEventListener('submit', (e) => {
        if(inputName.validity.valid || inputName.value.trim() === "" || inputName.value.length === 1) {
            nameError();

            e.preventDefault();
        }

        if(inputEmail.validity.valid) {
            emailError();

            e.preventDefault();
        }

        const containsLetters = /^.*[a-zA-Z]+.*$/;
        const minimum8Chars = /^.{8,}$/;
        const containsNumbers = /^.*[0-9]+.*$/;

        if(inputPassOne.validity.valid ||
            !containsNumbers.test(inputPassOne.value) &&
            !containsLetters.test(inputPassOne.value) &&
            !minimum8Chars.test(inputPassOne.value)) {
            passOneError();

            e.preventDefault();
        }

        if(inputPassTwo.value !== inputPassOne.value) {
            form.insertBefore(errorPassTwo, buttonTemplate());
            errorPassTwo.textContent = 'Пароли не совпадают';

            e.preventDefault();
        }

        if(inputPassTwo.validity.valid) {
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
