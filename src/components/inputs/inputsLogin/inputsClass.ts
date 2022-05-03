import inputsTemplate from "../inputsReg/inputs.pug";
import UserModel from "../../../models/User";
import { regExp } from "Components/inputs/utils/regExp/regExp";
import router from "Routing/router.ts";
import { textErrors } from "Components/inputs/utils/textErrors/textErrors";
import '../inputs.scss'

const configElement = [
    {
        key: "email",
        data: "../../static/email.svg",
        placeholder: "Почта",
        type: "email",
        error: "emailError",
    },
    {
        key: "password",
        data: "../../static/password.svg",
        placeholder: "Пароль",
        type: "password",
        error: "passwordError",
    },
];

export default class InputsClass {
    render() {
        return inputsTemplate({ items: configElement });
    }

    setHandler(): void {
        const form = document.querySelector(".menu-form");

        const inputEmail: HTMLInputElement = document.querySelector(
            'input[data-section="email"]'
        );
        const errorEmail = document.querySelector(
            'div[data-section="emailError"]'
        );

        const inputPassword: HTMLInputElement = document.querySelector(
            'input[data-section="password"]'
        );
        const errorPassword = document.querySelector(
            'div[data-section="passwordError"]'
        );

        const errorIncorr = document.querySelector(
            'div[data-section="incorrect"]'
        );

        const emailError = () => {
            if (inputEmail.validity.valueMissing) {
                errorEmail.classList.add("error-active");
                errorEmail.textContent = textErrors.empty;

                return;
            }

            errorEmail.classList.add("error-active");
            errorEmail.textContent = textErrors.wrongEmail;
        };

        const passwordError = () => {
            errorPassword.classList.add("error-active");
            errorPassword.textContent = textErrors.empty;
        };

        inputEmail.addEventListener("change", () => {
            if (
                regExp.checkEmail.test(inputEmail.value) &&
                inputEmail.value.length !== 0 &&
                inputEmail.validity.valid
            ) {
                errorEmail.classList.remove("error-active");

                return;
            }

            emailError();
        });

        inputEmail.addEventListener("keydown", () => {
            errorIncorr.classList.remove("error-active");
            errorEmail.classList.remove("error-active");
        });

        inputPassword.addEventListener("change", () => {
            if (inputPassword.validity.valid) {
                errorPassword.classList.remove("error-active");

                return;
            }

            passwordError();
        });

        inputPassword.addEventListener("keydown", () => {
            errorIncorr.classList.remove("error-active");
            errorPassword.classList.remove("error-active");
        });

        const validation = async (e) => {
            let check = 0;
            if (!inputEmail.validity.valid) {
                check++;
                emailError();

                e.preventDefault();
            }

            if (
                !regExp.checkEmail.test(inputEmail.value) ||
                inputEmail.value.length === 0 ||
                !inputEmail.validity.valid
            ) {
                check++;
                emailError();

                e.preventDefault();
            }

            if (check === 0) {
                e.preventDefault();

                const formJson = JSON.stringify({
                    email: inputEmail.value.trim(),
                    password: inputPassword.value,
                });

                const errorIncorr = document.querySelector(
                    'div[data-section="incorrect"]'
                );
                const {isAuth} = await UserModel.log(formJson);

                if (!isAuth) {
                    errorIncorr.classList.add("error-active");
                    errorIncorr.classList.add("center");
                    errorIncorr.textContent = "Неверный логин или пароль";

                    return;
                }
                router.go("/");
            }
        };

        form.addEventListener("submit", (e) => {
            validation(e);
        });
    }
}
