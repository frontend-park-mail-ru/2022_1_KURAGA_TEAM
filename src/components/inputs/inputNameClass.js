import inputsTemplate from "./inputs.js";
import buttonTemplate from "../button/button.js";

export class InputNameClass {
    #items;
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    set items(value) {
        this.#items = value;
    }

    render() {
        this.#parent.innerHTML += inputsTemplate(this.#items);
    }

    setHandler()    {
        const form = document.querySelector('.menu-form');

        const inputName = document.querySelector('input[data-section="name"]');
        const errorName = document.querySelector('div[data-section="nameError"]');
        form.removeChild(errorName);

        const divEmail = document.querySelector('div[data-section="email"]');
        const inputEmail = document.querySelector('input[data-section="email"]');
        const errorEmail = document.querySelector('div[data-section="emailError"]');
        form.removeChild(errorEmail);

        const divPassOne = document.querySelector('div[data-section="passwordFirst"]');
        const inputPassOne = document.querySelector('input[data-section="passwordFirst"]');
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');
        form.removeChild(errorPassOne);

        const divPassTwo = document.querySelector('div[data-section="passwordSecond"]');
        const inputPassTwo = document.querySelector('input[data-section="passwordSecond"]');
        const errorPassTwo = document.querySelector('div[data-section="passTwoError"]');
        form.removeChild(errorPassTwo);

        function nameError() {
            form.insertBefore(errorName, divEmail);
            errorName.textContent = 'Заполните поле';
        }

        function emailError() {
            if(inputEmail.validity.valueMissing) {
                form.insertBefore(errorEmail, divPassOne);
                errorEmail.textContent = 'Заполните поле';

                return;
            }

            if(inputEmail.validity.typeMismatch) {
                form.insertBefore(errorEmail, divPassOne);
                errorEmail.textContent = 'Введите действительный email';
            }
        }

        function passOneError() {
            form.insertBefore(errorPassOne, divPassTwo);
            errorPassOne.innerText = 'Пароль должен содержать не менее 8-ми символов,' +
                '\n в том числе цифры и латинские буквы';
        }

        function passTwoError() {
            if(errorPassTwo.validity.valueMissing) {
                form.insertBefore(errorPassTwo, buttonTemplate);
                errorPassTwo.textContent = 'Заполните поле';
            }
        }

        inputName.addEventListener('click', () => {
            console.log(1)
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
    }
}