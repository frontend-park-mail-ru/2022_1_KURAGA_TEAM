import inputsTemplate from "./inputs.js";

export class InputsClass {
    render() {
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

        const formElements = Object.entries(configElement)
            .map(([key, {data, placeholder, type, error}]) =>
                ({key, data, placeholder, type, error}));

        return  inputsTemplate(formElements);
    }

    setHandler() {
        const form = document.querySelector('.menu-form');

        const inputName = document.querySelector('input[data-section="name"]');
        const errorName = document.querySelector('div[data-section="nameError"]');

        const divEmail = document.querySelector('div[data-section="email"]');
        const inputEmail = document.querySelector('input[data-section="email"]');
        const errorEmail = document.querySelector('div[data-section="emailError"]');

        const divPassOne = document.querySelector('div[data-section="passwordFirst"]');
        const inputPassOne = document.querySelector('input[data-section="passwordFirst"]');
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');

        const divPassTwo = document.querySelector('div[data-section="passwordSecond"]');
        const inputPassTwo = document.querySelector('input[data-section="passwordSecond"]');
        const errorPassTwo = document.querySelector('div[data-section="passTwoError"]');

        function nameError() {
            errorName.classList.add("error-active");
            errorName.textContent = 'Заполните поле';
        }

        function emailError() {
            if(inputEmail.validity.valueMissing) {
                errorEmail.classList.add("error-active");
                errorEmail.textContent = 'Заполните поле';

                return;
            }

            if(inputEmail.validity.typeMismatch) {
                errorEmail.classList.add("error-active");
                errorEmail.textContent = 'Введите действительный email';
            }
        }

        function passOneError() {
            errorPassOne.classList.add("error-active");
            errorPassOne.innerText = 'Пароль должен содержать не менее 8-ми символов,' +
                '\n в том числе цифры и латинские буквы';
        }

        function passTwoError() {
            if(errorPassTwo.validity.valueMissing) {
                errorPassTwo.classList.add("error-active");
                errorPassTwo.textContent = 'Заполните поле';
            }
        }

        inputName.addEventListener('click', () => {
            if (inputName.value.trim() === "") {
                nameError();

                return;
            }

            if (inputName.validity.valid) {
               errorName.classList.remove("error-active");

                return;
            }

            nameError();
        });

        inputName.addEventListener('keydown', () => {
            errorName.classList.remove("error-active");
        });

        inputEmail.addEventListener('change', () => {
            if (inputEmail.validity.valid) {
                errorEmail.classList.remove("error-active");

                return;
            }

            emailError();
        });

        inputEmail.addEventListener('keydown', () => {
            errorEmail.classList.remove("error-active");
        });

        inputPassOne.addEventListener('change', () => {
            const containsLetters = /^.*[a-zA-Z]+.*$/;
            const minimum8Chars = /^.{8,}$/;
            const containsNumbers = /^.*[0-9]+.*$/;

            if (inputPassOne.validity.valid &&
                containsNumbers.test(inputPassOne.value) &&
                containsLetters.test(inputPassOne.value) &&
                minimum8Chars.test(inputPassOne.value)) {
                errorPassOne.classList.remove("error-active");

                return;
            }

            passOneError();
        });

        inputPassOne.addEventListener('keydown', () => {
            errorPassOne.classList.remove("error-active");
        });

        inputPassTwo.addEventListener('change', () => {
            if (inputPassTwo.validity.valid) {
                errorPassTwo.classList.remove("error-active");

                return;
            }

            passTwoError();
        });

        inputPassTwo.addEventListener('keydown', () => {
            errorPassTwo.classList.remove("error-active");
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
                errorPassTwo.classList.add("error-active");
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