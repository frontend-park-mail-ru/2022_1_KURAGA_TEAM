import inputsTemplate from "../inputsReg/inputs.js";
import {login} from "../../../modules/network.js";
import router from "../../../routing/router.js";

export class InputsClass {
    render() {
        const configElement = {
            email: {
                data: "../../static/email.svg",
                placeholder: "Введите Почту",
                type: "email",
                error: "emailError",
            },
            password: {
                data: "../../static/password.svg",
                placeholder: "Введите Пароль",
                type: "password",
                error: "passwordError",
            },
        }

        const formElements = Object.entries(configElement)
            .map(([key, {data, placeholder, type, error}]) =>
                ({key, data, placeholder, type, error}));

        return  inputsTemplate(formElements);
    }

    setHandler() {
        const form = document.querySelector('.menu-form');

        const inputEmail = document.querySelector('input[data-section="email"]');
        const errorEmail = document.querySelector('div[data-section="emailError"]');

        const inputPassword = document.querySelector('input[data-section="password"]');
        const errorPassword = document.querySelector('div[data-section="passwordError"]');

        const errorIncorr = document.querySelector('div[data-section="incorrect"]');

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

        function passwordError() {
            errorPassword.classList.add("error-active");
            errorPassword.innerText = 'Пароль должен содержать не менее 8-ми символов,' +
                '\n в том числе цифры и латинские буквы';
        }


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

        inputPassword.addEventListener('change', () => {
            const containsLetters = /^.*[a-zA-Z]+.*$/;
            const minimum8Chars = /^.{8,}$/;
            const containsNumbers = /^.*[0-9]+.*$/;

            if (inputPassword.validity.valid &&
                containsNumbers.test(inputPassword.value) &&
                containsLetters.test(inputPassword.value) &&
                minimum8Chars.test(inputPassword.value)) {
                errorPassword.classList.remove("error-active");

                return;
            }

            passwordError();
        });

        inputPassword.addEventListener('keydown', () => {
            errorPassword.classList.remove("error-active");
        });

        form.addEventListener('submit', (e) => {
            let check = 0;
            if(!inputEmail.validity.valid) {
                check++;
                emailError();

                e.preventDefault();
            }

            const containsLetters = /^.*[a-zA-Z]+.*$/;
            const minimum8Chars = /^.{8,}$/;
            const containsNumbers = /^.*[0-9]+.*$/;

            if(!inputPassword.validity.valid ||
                !containsNumbers.test(inputPassword.value) ||
                !containsLetters.test(inputPassword.value) ||
                !minimum8Chars.test(inputPassword.value)) {
                check++;
                passwordError();

                e.preventDefault();
            }

            if (check === 0) {
                e.preventDefault();

                login(form)
                    .then(({status, responseBody}) => {
                        if (Number(status) / 100 === 4) {
                            errorIncorr.classList.add("error-active center");
                            errorIncorr.textContent = "Неверная почта или пароль";
                        } else {
                            router.go("/");
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
        });
    }
}