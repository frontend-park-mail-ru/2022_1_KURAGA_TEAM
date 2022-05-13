import inputsTemplate from "./inputs.pug";
import UserModel from "../../../models/User";
import router from "Routing/router.ts";
import {textErrors} from "Components/inputs/utils/textErrors/textErrors";
import {regExp} from "Components/inputs/utils/regExp/regExp";
import '../inputs.scss'

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
        return inputsTemplate({items: configElement});
    }

    setHandler(): void {
        const form = document.querySelector(".menu-form");

        const inputName: HTMLInputElement = document.querySelector(
            'input[data-section="name"]'
        );

        const inputEmail: HTMLInputElement = document.querySelector(
            'input[data-section="email"]'
        );

        const inputPassOne: HTMLInputElement = document.querySelector(
            'input[data-section="passwordFirst"]'
        );

        const inputPassTwo: HTMLInputElement = document.querySelector(
            'input[data-section="passwordSecond"]'
        );

        inputName.addEventListener("change", this.inputNameChange);

        inputName.addEventListener("keydown", this.inputNameKeyDown);

        inputEmail.addEventListener("change", this.inputEmailChange);

        inputEmail.addEventListener("keydown", this.inputEmailKeyDown);

        inputPassOne.addEventListener("change", this.inputPassOneChange);

        inputPassOne.addEventListener("keydown", this.inputPassOneKeyDown);

        inputPassTwo.addEventListener("change", this.inputPassTwoChange);

        inputPassTwo.addEventListener("keydown", this.inputPassTwoKeyDown);

        form.addEventListener("submit", this.validation);
    }

    async validation(e: any) {
        const inputName: HTMLInputElement = document.querySelector(
            'input[data-section="name"]'
        );

        const inputEmail: HTMLInputElement = document.querySelector(
            'input[data-section="email"]'
        );

        const inputPassOne: HTMLInputElement = document.querySelector(
            'input[data-section="passwordFirst"]'
        );

        const inputPassTwo: HTMLInputElement = document.querySelector(
            'input[data-section="passwordSecond"]'
        );
        const errorPassTwo = document.querySelector(
            'div[data-section="passTwoError"]'
        );

        let check = 0;

        if (
            !inputName.validity.valid ||
            inputName.value.trim() === "" ||
            InputsClass.nameValid()
        ) {
            check++;
            InputsClass.nameError();

            e.preventDefault();
        }

        if (
            !regExp.checkEmail.test(inputEmail.value) ||
            inputEmail.value.length === 0 ||
            !inputEmail.validity.valid
        ) {
            check++;
            InputsClass.emailError();

            e.preventDefault();
        }

        if (!inputPassOne.validity.valid) {
            check++;
            InputsClass.passOneErrorEmpty();

            e.preventDefault();
        } else if (!regExp.minimum8Chars.test(inputPassOne.value)) {
            check++;
            InputsClass.passOneErrorLength();

            e.preventDefault();
        } else if (
            !regExp.containsNumbers.test(inputPassOne.value) ||
            !regExp.containsLetters.test(inputPassOne.value)
        ) {
            check++;
            InputsClass.passOneErrorAllow();

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
            InputsClass.passTwoError();

            e.preventDefault();
        }

        if (check === 0) {
            e.preventDefault();

            const formJson = JSON.stringify({
                username: inputName.value.trim(),
                email: inputEmail.value.trim(),
                password: inputPassOne.value,
            });

            const errorIncorr = document.querySelector(
                'div[data-section="incorrect"]'
            );

            const {isAuth, regBody} = await UserModel.reg(formJson);

            if (regBody.message === "ERROR: Email is not unique") {
                errorIncorr.classList.add("error-active");
                errorIncorr.classList.add("center");
                errorIncorr.textContent =
                    "Такой пользователь уже существует";

                return;
            }
            if (!isAuth) {
                errorIncorr.classList.add("error-active");
                errorIncorr.classList.add("center");
                errorIncorr.textContent =
                    "Упс... У нас что-то пошло не так!";
                return;
            }
            router.go("/");
        }
    };

    inputPassTwoKeyDown(): void {
        const errorPassTwo = document.querySelector(
            'div[data-section="passTwoError"]'
        );

        errorPassTwo.classList.remove("error-active");
    }

    static passTwoError(): void {
        const errorPassTwo = document.querySelector(
            'div[data-section="passTwoError"]'
        );

        errorPassTwo.classList.add("error-active");
        errorPassTwo.textContent = textErrors.secondPassErr;
    }

    inputPassTwoChange(): void {
        const inputPassTwo: HTMLInputElement = document.querySelector(
            'input[data-section="passwordSecond"]'
        );
        const errorPassTwo = document.querySelector(
            'div[data-section="passTwoError"]'
        );

        if (inputPassTwo.validity.valid) {
            errorPassTwo.classList.remove("error-active");

            return;
        }

        InputsClass.passTwoError();
    }

    inputPassOneKeyDown(): void {
        const errorPassOne = document.querySelector(
            'div[data-section="passOneError"]'
        );

        errorPassOne.classList.remove("error-active");
    }

    static passOneErrorEmpty(): void {
        const errorPassOne = document.querySelector(
            'div[data-section="passOneError"]'
        );

        errorPassOne.classList.add("error-active");
        errorPassOne.textContent = textErrors.empty;
    }

    static passOneErrorLength(): void {
        const errorPassOne = document.querySelector(
            'div[data-section="passOneError"]'
        );

        errorPassOne.classList.add("error-active");
        errorPassOne.textContent = textErrors.shortPass;
    }

    static passOneErrorAllow(): void {
        const errorPassOne = document.querySelector(
            'div[data-section="passOneError"]'
        );

        errorPassOne.classList.add("error-active");
        errorPassOne.textContent = textErrors.wrongPass;
    }

    inputPassOneChange(): void {
        const inputPassOne: HTMLInputElement = document.querySelector(
            'input[data-section="passwordFirst"]'
        );
        const errorPassOne = document.querySelector(
            'div[data-section="passOneError"]'
        );

        if (!inputPassOne.validity.valid) {
            InputsClass.passOneErrorEmpty();

            return;
        }

        if (inputPassOne.value.length > 50) {
            errorPassOne.classList.add("error-active");
            errorPassOne.textContent = textErrors.tooLong;

            return;
        }

        if (!regExp.minimum8Chars.test(inputPassOne.value)) {
            InputsClass.passOneErrorLength();

            return;
        }

        if (
            !regExp.containsNumbers.test(inputPassOne.value) ||
            !regExp.containsLetters.test(inputPassOne.value)
        ) {
            InputsClass.passOneErrorAllow();

            return;
        }

        errorPassOne.classList.remove("error-active");
    }

    inputEmailKeyDown(): void {
        const errorEmail = document.querySelector(
            'div[data-section="emailError"]'
        );

        errorEmail.classList.remove("error-active");
    }

    static emailError(): void {
        const inputEmail: HTMLInputElement = document.querySelector(
            'input[data-section="email"]'
        );
        const errorEmail = document.querySelector(
            'div[data-section="emailError"]'
        );

        if (inputEmail.validity.valueMissing) {
            errorEmail.classList.add("error-active");
            errorEmail.textContent = textErrors.empty;

            return;
        }

        errorEmail.classList.add("error-active");
        errorEmail.textContent = textErrors.wrongEmail;
    }

    inputEmailChange(): void {
        const inputEmail: HTMLInputElement = document.querySelector(
            'input[data-section="email"]'
        );
        const errorEmail = document.querySelector(
            'div[data-section="emailError"]'
        );

        if (
            regExp.checkEmail.test(inputEmail.value) &&
            inputEmail.value.length !== 0 &&
            inputEmail.validity.valid &&
            inputEmail.value.length < 50
        ) {
            errorEmail.classList.remove("error-active");

            return;
        }

        InputsClass.emailError();
    }

    inputNameKeyDown(): void {
        const errorName = document.querySelector(
            'div[data-section="nameError"]'
        );

        errorName.classList.remove("error-active");
    }

    static nameValid(): boolean {
        const inputName: HTMLInputElement = document.querySelector(
            'input[data-section="name"]'
        );

        return (
            inputName.value.match(/<script>/) !== null ||
            inputName.value.match(/<a/) !== null ||
            inputName.value.match(/<img/) !== null ||
            inputName.value.match(/<img/) !== null ||
            !(regExp.checkUsername.test(inputName.value))
        );
    }

    static nameError(): void {
        const errorName = document.querySelector(
            'div[data-section="nameError"]'
        );

        if (InputsClass.nameValid()) {
            errorName.classList.add("error-active");
            errorName.textContent = textErrors.wrongData;

            return;
        }

        errorName.classList.add("error-active");
        errorName.textContent = textErrors.empty;
    }

    inputNameChange(): void {
        const inputName: HTMLInputElement = document.querySelector(
            'input[data-section="name"]'
        );
        const errorName = document.querySelector(
            'div[data-section="nameError"]'
        );

        if (inputName.value.trim() === "" || InputsClass.nameValid()) {
            InputsClass.nameError();

            return;
        }

        if (inputName.validity.valid) {
            errorName.classList.remove("error-active");

            return;
        }

        InputsClass.nameError();
    }

    unmount(): void {
        const inputName: HTMLInputElement = document.querySelector(
            'input[data-section="name"]'
        );
        const inputEmail: HTMLInputElement = document.querySelector(
            'input[data-section="email"]'
        );
        const inputPassOne: HTMLInputElement = document.querySelector(
            'input[data-section="passwordFirst"]'
        );
        const inputPassTwo: HTMLInputElement = document.querySelector(
            'input[data-section="passwordSecond"]'
        );
        const form = document.querySelector(".menu-form");

        inputName.removeEventListener("change", this.inputNameChange);
        inputName.removeEventListener("keydown", this.inputNameKeyDown);
        inputEmail.removeEventListener("change", this.inputEmailChange);
        inputEmail.removeEventListener("keydown", this.inputEmailKeyDown);
        inputPassOne.removeEventListener("change", this.inputPassOneChange);
        inputPassOne.removeEventListener("keydown", this.inputPassOneKeyDown);
        inputPassTwo.removeEventListener("change", this.inputPassTwoChange);
        inputPassTwo.removeEventListener("keydown", this.inputPassTwoKeyDown);
        form.removeEventListener("submit", this.validation);
    }
}
