import inputsTemplate from "../inputsReg/inputs.pug";
import UserModel from "../../../models/User";
import router from "Routing/router";
import { routes } from "Routing/constRouting";
import { regExp } from "Components/inputs/utils/regExp/regExp";
import { textErrors } from "Components/inputs/utils/textErrors/textErrors";
import { Info } from "../../../types";
import '../inputs.scss'

const configElement = [
    {
        key: "name",
        data: "../../static/name.svg",
        placeholder: "Новое имя",
        type: "text",
        error: "nameError",
    },
    {
        key: "email",
        data: "../../static/email.svg",
        placeholder: "",
        type: "email",
        error: "",
    },
    {
        key: "passwordFirst",
        data: "../../static/password.svg",
        placeholder: "Новый пароль",
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

export default class InputsProfileClass {
    private info: Info;
    private static checkAvatar: number;

    constructor({ username, email }: { username: string; email: string }) {
        this.info = {
            username,
            email,
        };

        InputsProfileClass.checkAvatar = 0;
    }

    render() {
        return inputsTemplate({ items: configElement });
    }

    setHandler(): void {
        const form = document.querySelector(".form-profile");

        const inputName: HTMLInputElement = document.querySelector('input[data-section="name"]');
        inputName.value = this.info.username;

        const divEmail = document.querySelector('div[data-section="email"]');
        divEmail.classList.add("profile-email");
        divEmail.classList.remove("element");

        const inputEmail: HTMLInputElement = document.querySelector(
            'input[data-section="email"]'
        );
        inputEmail.readOnly = true;
        inputEmail.value = this.info.email;

        const inputPassOne: HTMLInputElement = document.querySelector('input[data-section="passwordFirst"]');

        const inputPassTwo: HTMLInputElement = document.querySelector('input[data-section="passwordSecond"]');

        const inputAvatar: HTMLInputElement = document.querySelector('input[class="profile-avatar__input"]');


        inputName.addEventListener("change", this.inputNameChange);

        inputName.addEventListener("keydown", this.inputNameKeyDown);

        inputPassOne.addEventListener("change", this.inputPassOneChange);

        inputPassOne.addEventListener("keydown", this.inputPassOneKeyDown);

        inputPassTwo.addEventListener("keydown", this.inputPassTwoKeyDown);

        inputAvatar.addEventListener("change", this.inputAvatarChange);

        form.addEventListener("submit", this.validation);
    }

    static response(isAuth) {
        const errorIncorr = document.querySelector('div[data-section="profile-info"]');

        if (!isAuth) {
            errorIncorr.classList.add("error-active");
            errorIncorr.classList.add("center");
            errorIncorr.textContent = textErrors.serverError;

            return;
        }

        errorIncorr.classList.add("error-active");
        errorIncorr.classList.add("center");
        errorIncorr.classList.add("success");
        errorIncorr.classList.remove("not-success");
        errorIncorr.textContent = textErrors.success;
    };

    validation(e: any): void {
        const miniAvatar: HTMLDivElement = document.querySelector(".btn-profile");
        const errorIncorr = document.querySelector('div[data-section="profile-info"]');
        const errorPassTwo = document.querySelector('div[data-section="passTwoError"]');
        const inputAvatar: HTMLInputElement = document.querySelector('input[class="profile-avatar__input"]');
        const inputName: HTMLInputElement = document.querySelector('input[data-section="name"]');
        const inputPassOne: HTMLInputElement = document.querySelector('input[data-section="passwordFirst"]');
        const inputPassTwo: HTMLInputElement = document.querySelector('input[data-section="passwordSecond"]');

        let check = 0;
        let caseForm = 0;

        if (inputName.value.trim() === this.info.username) {
            caseForm = 1;
        }

        if (
            !inputName.validity.valid ||
            inputName.value.trim() === "" ||
            InputsProfileClass.nameValid()
        ) {
            check++;
            InputsProfileClass.nameError();

            e.preventDefault();
        }

        if (inputPassOne.value.length === 0) {
            caseForm += 2;
        } else if (
            !inputPassOne.validity.valueMissing &&
            !regExp.minimum8Chars.test(inputPassOne.value)
        ) {
            check++;
            InputsProfileClass.passOneErrorLength();

            e.preventDefault();
        } else if (
            !regExp.containsNumbers.test(inputPassOne.value) ||
            !regExp.containsLetters.test(inputPassOne.value)
        ) {
            check++;
            InputsProfileClass.passOneErrorAllow();

            e.preventDefault();
        }

        if (
            inputPassOne.value.length !== 0 &&
            inputPassTwo.value !== inputPassOne.value
        ) {
            check++;
            errorPassTwo.classList.add("error-active");
            errorPassTwo.textContent = textErrors.secondPassErr;

            e.preventDefault();
        }

        if (check === 0) {
            errorPassTwo.classList.remove("error-active");
            e.preventDefault();

            let kolReg = 0;

            let formJson = "";
            let formData = new FormData();

            if (caseForm !== 3) {
                kolReg++;
                formJson = JSON.stringify({
                    username: inputName.value.trim(),
                    password: inputPassOne.value,
                });
            }

            if (InputsProfileClass.checkAvatar === 1) {
                kolReg += 2;
                formData.append("file", inputAvatar.files[0]);
            }

            if (caseForm === 3 && InputsProfileClass.checkAvatar === 0) {
                errorIncorr.classList.add("error-active");
                errorIncorr.classList.add("center");
                errorIncorr.classList.add("not-success");
                errorIncorr.textContent = textErrors.sameInfo;

                return;
            }

            if (kolReg === 1) {
                UserModel.editProfile(formJson)
                    .then(({ isAuth }) => {
                        InputsProfileClass.response(isAuth);

                        const name = document.getElementsByClassName(
                            "font-nav name-profile"
                        );
                        name[0].textContent = inputName.value.trim();
                        this.info.username = inputName.value.trim();
                    })
                    .catch(() => {
                        router.go(routes.ERROR_CATCH_VIEW);
                    });
            }

            if (kolReg === 2) {
                UserModel.editAvatar(formData)
                    .then(({ isAuth }) => {
                        InputsProfileClass.response(isAuth);

                        miniAvatar.style.backgroundImage = `url(${URL.createObjectURL(
                            inputAvatar.files[0]
                        )})`;
                    })
                    .catch(() => {
                        router.go(routes.ERROR_CATCH_VIEW);
                    });
            }

            if (kolReg === 3) {
                Promise.all([
                    UserModel.editProfile(formJson),
                    UserModel.editAvatar(formData),
                ])
                    .then(([text, file]) => {
                        if (!text.isAuth || !file.isAuth) {
                            errorIncorr.classList.add("error-active");
                            errorIncorr.classList.add("center");
                            errorIncorr.classList.add("not-success");
                            errorIncorr.textContent =
                                textErrors.serverError;

                            return;
                        }

                        errorIncorr.classList.add("error-active");
                        errorIncorr.classList.add("center");
                        errorIncorr.classList.add("success");
                        errorIncorr.classList.remove("not-success");
                        errorIncorr.textContent = textErrors.success;

                        const name = document.getElementsByClassName(
                            "font-nav name-profile"
                        );
                        name[0].textContent = inputName.value.trim();
                        this.info.username = inputName.value.trim();
                    })
                    .catch(() => {
                        router.go(routes.ERROR_CATCH_VIEW);
                    });
            }
        }
    };

    inputAvatarChange(): void {
        const inputAvatar: HTMLInputElement = document.querySelector('input[class="profile-avatar__input"]');
        const avatarImg: HTMLImageElement = document.querySelector(".profile-avatar");

        InputsProfileClass.checkAvatar = 1;
        avatarImg.src = URL.createObjectURL(inputAvatar.files[0]);
    }

    inputPassTwoKeyDown(): void {
        const errorIncorr = document.querySelector('div[data-section="profile-info"]');
        const errorPassTwo = document.querySelector('div[data-section="passTwoError"]');

        errorIncorr.classList.remove("error-active");
        errorPassTwo.classList.remove("error-active");
    }

    inputPassOneKeyDown(): void {
        const errorIncorr = document.querySelector('div[data-section="profile-info"]');
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');

        errorIncorr.classList.remove("error-active");
        errorPassOne.classList.remove("error-active");
    }

    static passOneErrorLength(): void {
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');

        errorPassOne.classList.add("error-active");
        errorPassOne.textContent = textErrors.shortPass;
    };

    static passOneErrorAllow(): void {
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');

        errorPassOne.classList.add("error-active");
        errorPassOne.textContent = textErrors.wrongPass;
    };

    inputPassOneChange(): void {
        const inputPassOne: HTMLInputElement = document.querySelector('input[data-section="passwordFirst"]');
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');

        if (inputPassOne.value.length === 0) {
            return;
        }

        if (inputPassOne.value.length > 50) {
            errorPassOne.classList.add("error-active");
            errorPassOne.textContent = textErrors.tooLong;

            return;
        }

        if (!regExp.minimum8Chars.test(inputPassOne.value)) {
            InputsProfileClass.passOneErrorLength();

            return;
        }

        if (
            !regExp.containsNumbers.test(inputPassOne.value) ||
            !regExp.containsLetters.test(inputPassOne.value)
        ) {
            InputsProfileClass.passOneErrorAllow();

            return;
        }

        errorPassOne.classList.remove("error-active");
    }

    inputNameKeyDown(): void {
        const errorIncorr = document.querySelector('div[data-section="profile-info"]');
        const errorName = document.querySelector('div[data-section="nameError"]');

        errorIncorr.classList.remove("error-active");
        errorName.classList.remove("error-active");
    }

    static nameValid(): boolean {
        const inputName: HTMLInputElement = document.querySelector('input[data-section="name"]');

        return (
            inputName.value.match(/<script>/) !== null ||
            inputName.value.match(/<a/) !== null ||
            inputName.value.match(/<img/) !== null ||
            inputName.value.match(/<img/) !== null ||
            !(regExp.checkUsername.test(inputName.value))
        );
    };

    static nameError(): void {
        const errorName = document.querySelector('div[data-section="nameError"]');

        if (this.nameValid()) {
            errorName.classList.add("error-active");
            errorName.textContent = textErrors.wrongData;

            return;
        }

        errorName.classList.add("error-active");
        errorName.textContent = textErrors.empty;
    };

    inputNameChange(): void {
        const errorName = document.querySelector('div[data-section="nameError"]');
        const inputName: HTMLInputElement = document.querySelector('input[data-section="name"]');

        if (inputName.value.trim() === "" || InputsProfileClass.nameValid()) {
            InputsProfileClass.nameError();

            return;
        }

        if (inputName.validity.valid) {
            errorName.classList.remove("error-active");

            return;
        }

        InputsProfileClass.nameError();
    }

    unmount(): void {
        const inputAvatar: HTMLInputElement = document.querySelector('input[class="profile-avatar__input"]');
        const inputName: HTMLInputElement = document.querySelector('input[data-section="name"]');
        const inputPassOne: HTMLInputElement = document.querySelector('input[data-section="passwordFirst"]');
        const inputPassTwo: HTMLInputElement = document.querySelector('input[data-section="passwordSecond"]');
        const form = document.querySelector(".form-profile");

        inputName.removeEventListener("change", this.inputNameChange);
        inputName.removeEventListener("keydown", this.inputNameKeyDown);
        inputPassOne.removeEventListener("change", this.inputPassOneChange);
        inputPassOne.removeEventListener("keydown", this.inputPassOneKeyDown);
        inputPassTwo.removeEventListener("keydown", this.inputPassTwoKeyDown);
        inputAvatar.removeEventListener("change", this.inputAvatarChange);
        form.removeEventListener("submit", this.validation);
    }
}
