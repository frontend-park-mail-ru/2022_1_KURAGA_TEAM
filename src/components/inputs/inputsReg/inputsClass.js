import inputsTemplate from "./inputs.js";
import {login, registration} from "../../../modules/network";
import router from "../../../routing/router";

const configElement = [
    {
        key: "name",
        data: "../../static/name.svg",
        placeholder: "Введите Имя",
        type: "text",
        error: "nameError",
    },
    {
        key: "email",
        data: "../../static/email.svg",
        placeholder: "Введите Почту",
        type: "email",
        error: "emailError",
    },
    {
        key: "passwordFirst",
        data: "../../static/password.svg",
        placeholder: "Введите Пароль",
        type: "password",
        error: "passOneError",
    },
    {
        key: "passwordSecond",
        data: "../../static/password.svg",
        placeholder: "Повторите Пароль",
        type: "password",
        error: "passTwoError",
    }
];

export class InputsClass {
    render() {
        return  inputsTemplate(configElement);
    }

    setHandler() {
        const form = document.querySelector('.menu-form');

        const inputName = document.querySelector('input[data-section="name"]');
        const errorName = document.querySelector('div[data-section="nameError"]');

        const inputEmail = document.querySelector('input[data-section="email"]');
        const errorEmail = document.querySelector('div[data-section="emailError"]');

        const inputPassOne = document.querySelector('input[data-section="passwordFirst"]');
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');

        const inputPassTwo = document.querySelector('input[data-section="passwordSecond"]');
        const errorPassTwo = document.querySelector('div[data-section="passTwoError"]');

        const errorIncorr = document.querySelector('div[data-section="incorrect"]');

        const nameError = () => {
            errorName.classList.add("error-active");
            errorName.textContent = 'Заполните поле';
        }

        const emailError = () => {
            if(inputEmail.validity.typeMismatch) {
                errorEmail.classList.add("error-active");
                errorEmail.textContent = 'Введите действительный email';

                return;
            }

            errorEmail.classList.add("error-active");
            errorEmail.textContent = 'Заполните поле';
        }

        const passOneError = () => {
            errorPassOne.classList.add("error-active");
            errorPassOne.innerText = 'Пароль должен содержать не менее 8-ми символов,' +
                '\n в том числе цифры и латинские буквы';
        }

        const passTwoError = () => {
            errorPassTwo.classList.add("error-active");
            errorPassTwo.textContent = 'Заполните поле';
        }

        inputName.addEventListener('change', () => {
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
            let check = 0;
            if(!inputName.validity.valid || inputName.value.trim() === "" || inputEmail.value.length === 1) {
                check++;
                nameError();

                e.preventDefault();
            }

            if(!inputEmail.validity.valid) {
                check++;
                emailError();

                e.preventDefault();
            }

            const containsLetters = /^.*[a-zA-Z]+.*$/;
            const minimum8Chars = /^.{8,}$/;
            const containsNumbers = /^.*[0-9]+.*$/;

            if(!inputPassTwo.validity.valid ||
                !containsNumbers.test(inputPassOne.value) ||
                !containsLetters.test(inputPassOne.value) ||
                !minimum8Chars.test(inputPassOne.value)) {
                check++;
                passOneError();

                e.preventDefault();
            }

            if(inputPassTwo.value !== inputPassOne.value) {
                check++;
                errorPassTwo.classList.add("error-active");
                errorPassTwo.textContent = 'Пароли не совпадают';

                e.preventDefault();
            }

            if(inputPassTwo.value.length === 0) {
                check++;
                console.log(inputPassTwo.value.length)
                passTwoError();

                e.preventDefault();
            }

            if (check === 0) {
                e.preventDefault();

                registration(form)
                    .then(() => {
                        router.go("/");
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        });
    }
}