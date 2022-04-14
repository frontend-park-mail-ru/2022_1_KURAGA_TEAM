import inputsTemplate from "./inputs.pug";
import UserModel from "../../../models/User";
import { textErrors } from "Components/inputs/utils/textErrors/textErrors";
import { regExp } from "Components/inputs/utils/regExp/regExp";

const configElement = [
    {
        key: "name",
        data: "../../static/name.svg",
        placeholder: "Имя",
        type: "text",
        error: "nameError",
    },
    {
        key: "email",
        data: "../../static/email.svg",
        placeholder: "Почта",
        type: "email",
        error: "emailError",
    },
    {
        key: "passwordFirst",
        data: "../../static/password.svg",
        placeholder: "Пароль",
        type: "password",
        error: "passOneError",
    },
    {
        key: "passwordSecond",
        data: "../../static/password.svg",
        placeholder: "Повторите пароль",
        type: "password",
        error: "passTwoError",
    },
];

export default class InputsClass {
    render() {
        return inputsTemplate({ items: configElement });
    }

    setHandler(): void {
        const form = document.querySelector(".menu-form");

        const inputName: HTMLInputElement = document.querySelector(
            'input[data-section="name"]'
        );
        const errorName = document.querySelector(
            'div[data-section="nameError"]'
        );

        const inputEmail: HTMLInputElement = document.querySelector(
            'input[data-section="email"]'
        );
        const errorEmail = document.querySelector(
            'div[data-section="emailError"]'
        );

        const inputPassOne: HTMLInputElement = document.querySelector(
            'input[data-section="passwordFirst"]'
        );
        const errorPassOne = document.querySelector(
            'div[data-section="passOneError"]'
        );

        const inputPassTwo: HTMLInputElement = document.querySelector(
            'input[data-section="passwordSecond"]'
        );
        const errorPassTwo = document.querySelector(
            'div[data-section="passTwoError"]'
        );

        const nameValid: () => boolean = () => {
            return (
                inputName.value.length === 1 ||
                inputName.value.match(/<script>/) !== null ||
                inputName.value.match(/<a/) !== null ||
                inputName.value.match(/<img/) !== null ||
                inputName.value.match(/<img/) !== null ||
                !(regExp.checkUsername.test(inputName.value))
            );
        };

        const nameError: () => void = () => {
            if (nameValid()) {
                errorName.classList.add("error-active");
                errorName.textContent = textErrors.wrongData;

                return;
            }

            errorName.classList.add("error-active");
            errorName.textContent = textErrors.empty;
        };

        const emailError: () => void = () => {
            if (inputEmail.validity.valueMissing) {
                errorEmail.classList.add("error-active");
                errorEmail.textContent = textErrors.empty;

                return;
            }

            errorEmail.classList.add("error-active");
            errorEmail.textContent = textErrors.wrongEmail;
        };

        const passOneErrorEmpty: () => void = () => {
            errorPassOne.classList.add("error-active");
            errorPassOne.textContent = textErrors.empty;
        };

        const passOneErrorLength: () => void = () => {
            errorPassOne.classList.add("error-active");
            errorPassOne.textContent = textErrors.shortPass;
        };

        const passOneErrorAllow: () => void = () => {
            errorPassOne.classList.add("error-active");
            errorPassOne.textContent = textErrors.wrongPass;
        };

        const passTwoError: () => void = () => {
            errorPassTwo.classList.add("error-active");
            errorPassTwo.textContent = textErrors.secondPassErr;
        };

        inputName.addEventListener("change", () => {
            if (inputName.value.trim() === "" || nameValid()) {
                nameError();

                return;
            }

            if (inputName.validity.valid) {
                errorName.classList.remove("error-active");

                return;
            }

            nameError();
        });

        inputName.addEventListener("keydown", () => {
            errorName.classList.remove("error-active");
        });

        inputEmail.addEventListener("change", () => {
            if (
                regExp.checkEmail.test(inputEmail.value) &&
                inputEmail.value.length !== 0 &&
                inputEmail.validity.valid &&
                inputEmail.value.length < 250
            ) {
                errorEmail.classList.remove("error-active");

                return;
            }

            emailError();
        });

        inputEmail.addEventListener("keydown", () => {
            errorEmail.classList.remove("error-active");
        });

        inputPassOne.addEventListener("change", () => {
            if (!inputPassOne.validity.valid) {
                passOneErrorEmpty();

                return;
            }

            if (inputPassOne.value.length > 50) {
                errorPassOne.classList.add("error-active");
                errorPassOne.textContent = textErrors.tooLong;

                return;
            }

            if (!regExp.minimum8Chars.test(inputPassOne.value)) {
                passOneErrorLength();

                return;
            }

            if (
                !regExp.containsNumbers.test(inputPassOne.value) ||
                !regExp.containsLetters.test(inputPassOne.value)
            ) {
                passOneErrorAllow();

                return;
            }

            errorPassOne.classList.remove("error-active");
        });

        inputPassOne.addEventListener("keydown", () => {
            errorPassOne.classList.remove("error-active");
        });

        inputPassTwo.addEventListener("change", () => {
            if (inputPassTwo.validity.valid) {
                errorPassTwo.classList.remove("error-active");

                return;
            }

            passTwoError();
        });

        inputPassTwo.addEventListener("keydown", () => {
            errorPassTwo.classList.remove("error-active");
        });

        const validation: (e: any) => void = (e) => {
            let check = 0;
            if (
                !inputName.validity.valid ||
                inputName.value.trim() === "" ||
                nameValid()
            ) {
                check++;
                nameError();

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

            if (!inputPassOne.validity.valid) {
                check++;
                passOneErrorEmpty();

                e.preventDefault();
            } else if (!regExp.minimum8Chars.test(inputPassOne.value)) {
                check++;
                passOneErrorLength();

                e.preventDefault();
            } else if (
                !regExp.containsNumbers.test(inputPassOne.value) ||
                !regExp.containsLetters.test(inputPassOne.value)
            ) {
                check++;
                passOneErrorAllow();

                e.preventDefault();
            }

            if (inputPassTwo.value !== inputPassOne.value) {
                check++;
                errorPassTwo.classList.add("error-active");
                errorPassTwo.textContent = textErrors.secondPassErr;

                e.preventDefault();
            }

            if (inputPassTwo.value.length === 0) {
                check++;
                passTwoError();

                e.preventDefault();
            }

            if (check === 0) {
                e.preventDefault();

                const formJson = JSON.stringify({
                    username: inputName.value.trim(),
                    email: inputEmail.value.trim(),
                    password: inputPassOne.value,
                });

                UserModel.reg(formJson);
            }
        };

        form.addEventListener("submit", (e) => {
            validation(e);
        });
    }
}
