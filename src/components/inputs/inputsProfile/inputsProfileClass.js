import inputsTemplate from '../inputsReg/inputs.pug';
import UserModel from "../../../models/User"
import router from "Routing/router";
import { routes } from "Routing/constRouting";
import {regExp} from "Components/inputs/utils/regExp/regExp";
import {textErrors} from "Components/inputs/utils/textErrors/textErrors";

const configElement = [
    {
        key: 'name',
        data: '../../static/name.svg',
        placeholder: 'Новое Имя',
        type: 'text',
        error: 'nameError',
    },
    {
        key: 'email',
        data: '../../static/email.svg',
        placeholder: '',
        type: 'email',
        error: '',
    },
    {
        key: 'passwordFirst',
        data: '../../static/password.svg',
        placeholder: 'Новый Пароль',
        type: 'password',
        error: 'passOneError',
    },
    {
        key: 'passwordSecond',
        data: '../../static/password.svg',
        placeholder: 'Повторите Пароль',
        type: 'password',
        error: 'passTwoError',
    },
];

export default class InputsProfileClass {
    #info;

    constructor({username, email}) {
        this.#info = {
            username,
            email
        }
    }

    render() {
        return inputsTemplate({items: configElement});
    }

    setHandler() {
        const form = document.querySelector('.form-profile');

        const inputName = document.querySelector('input[data-section="name"]');
        inputName.value = this.#info.username;
        const errorName = document.querySelector('div[data-section="nameError"]');

        const divEmail = document.querySelector('div[data-section="email"]');
        divEmail.classList.add('profile-email');
        divEmail.classList.remove('element');
        const inputEmail = document.querySelector('input[data-section="email"]');
        inputEmail.readOnly = true;
        inputEmail.value = this.#info.email;

        const inputPassOne = document.querySelector('input[data-section="passwordFirst"]');
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');

        const inputPassTwo = document.querySelector('input[data-section="passwordSecond"]');
        const errorPassTwo = document.querySelector('div[data-section="passTwoError"]');

        const inputAvatar = document.querySelector('input[class="profile-avatar__input"]');
        const avatarImg = document.querySelector('.profile-avatar');

        const errorIncorr = document.querySelector('div[data-section="profile-info"]');

        const miniAvatar = document.querySelector('.btn-profile');

        const nameValid = () => {
            return inputName.value.length === 1 || inputName.value.match(/<script>/) !== null
                || inputName.value.match(/<img/) !== null;
        }

        const nameError = () => {
            if (nameValid()) {
                errorName.classList.add('error-active');
                errorName.textContent = textErrors.wrongData;

                return;
            }

            errorName.classList.add('error-active');
            errorName.textContent = textErrors.empty;
        };

        const passOneErrorLength = () => {
            errorPassOne.classList.add('error-active');
            errorPassOne.innerText = textErrors.shortPass;
        };

        const passOneErrorAllow = () => {
            errorPassOne.classList.add('error-active');
            errorPassOne.innerText = textErrors.wrongPass;
        };

        inputName.addEventListener('change', () => {
            if (inputName.value.trim() === '' || nameValid()) {
                nameError();

                return;
            }

            if (inputName.validity.valid) {
                errorName.classList.remove('error-active');

                return;
            }

            nameError();
        });

        inputName.addEventListener('keydown', () => {
            errorIncorr.classList.remove('error-active');
            errorName.classList.remove('error-active');
        });

        inputPassOne.addEventListener('change', () => {
            if (inputPassOne.value.length === 0) {
                return;
            }

            if (!regExp.minimum8Chars.test(inputPassOne.value)) {
                passOneErrorLength();

                return;
            }

            if (!regExp.containsNumbers.test(inputPassOne.value)
                || !regExp.containsLetters.test(inputPassOne.value)) {
                passOneErrorAllow();

                return;
            }

            errorPassOne.classList.remove('error-active');
        });

        inputPassOne.addEventListener('keydown', () => {
            errorIncorr.classList.remove('error-active');
            errorPassOne.classList.remove('error-active');
        });

        inputPassTwo.addEventListener('keydown', () => {
            errorIncorr.classList.remove('error-active');
            errorPassTwo.classList.remove('error-active');
        });

        let checkAvatar = 0;
        inputAvatar.addEventListener('change', () => {
            checkAvatar = 1;
            avatarImg.src = URL.createObjectURL(inputAvatar.files[0]);
        });

        const response = (isAuth) => {
            if (!isAuth) {
                errorIncorr.classList.add('error-active');
                errorIncorr.classList.add('center');
                errorIncorr.textContent = textErrors.serverError;

                return;
            }

            errorIncorr.classList.add('error-active');
            errorIncorr.classList.add('center');
            errorIncorr.classList.add('success');
            errorIncorr.classList.remove('not-success');
            errorIncorr.textContent = textErrors.success;
        }

        const validation = (e) => {
            let check = 0;
            let caseForm = 0;

            if (inputName.value.trim() === this.#info.username) {
                caseForm = 1;
            }

            if (!inputName.validity.valid || inputName.value.trim() === '' || nameValid()) {
                check++;
                nameError();

                e.preventDefault();
            }

            if (inputPassOne.value.length === 0) {
                caseForm += 2;
            } else if (!inputPassOne.validity.valueMissing && !regExp.minimum8Chars.test(inputPassOne.value)) {
                check++;
                passOneErrorLength();

                e.preventDefault();
            } else if (!regExp.containsNumbers.test(inputPassOne.value)
                || !regExp.containsLetters.test(inputPassOne.value)) {
                check++;
                passOneErrorAllow();

                e.preventDefault();
            }

            if (inputPassOne.value.length !== 0 && inputPassTwo.value !== inputPassOne.value) {
                check++;
                errorPassTwo.classList.add('error-active');
                errorPassTwo.textContent = textErrors.secondPassErr;

                e.preventDefault();
            }

            if (check === 0) {
                errorPassTwo.classList.remove('error-active');
                e.preventDefault();

                let kolReg = 0;

                let formJson = '';
                let formData = new FormData();

                if (caseForm !== 3) {
                    kolReg++;
                    formJson = JSON.stringify({
                        username: inputName.value.trim(),
                        password: inputPassOne.value,
                    });
                }

                if (checkAvatar === 1) {
                    kolReg += 2;
                    formData.append('file', inputAvatar.files[0]);
                }

                if (caseForm === 3 && checkAvatar === 0) {
                    errorIncorr.classList.add('error-active');
                    errorIncorr.classList.add('center');
                    errorIncorr.classList.add('not-success');
                    errorIncorr.textContent = textErrors.sameInfo;

                    return;
                }

                if (kolReg === 1) {
                    UserModel.editProfile(formJson)
                        .then(({ isAuth }) => {
                            response(isAuth);

                            const name = document.getElementsByClassName('font-nav name-profile');
                            name[0].textContent = inputName.value.trim();
                            this.#info.username = inputName.value.trim();
                        })
                        .catch(() => {
                            router.go(routes.ERROR_CATCH_VIEW);
                        });
                }

                if (kolReg === 2) {
                    UserModel.editAvatar(formData)
                        .then(({ isAuth }) => {
                            response(isAuth);

                            miniAvatar.style.backgroundImage = `url(${URL.createObjectURL(inputAvatar.files[0])})`;
                        })
                        .catch(() => {
                            router.go(routes.ERROR_CATCH_VIEW);
                        });
                }

                if (kolReg === 3) {
                    Promise.all([UserModel.editProfile(formJson), UserModel.editAvatar(formData)])
                        .then(([text, file]) => {
                            if (!text.isAuth || !file.isAuth) {
                                errorIncorr.classList.add('error-active');
                                errorIncorr.classList.add('center');
                                errorIncorr.classList.add('not-success');
                                errorIncorr.textContent = textErrors.serverError;

                                return;
                            }

                            errorIncorr.classList.add('error-active');
                            errorIncorr.classList.add('center');
                            errorIncorr.classList.add('success');
                            errorIncorr.classList.remove('not-success');
                            errorIncorr.textContent = textErrors.success;

                            const name = document.getElementsByClassName('font-nav name-profile');
                            name[0].textContent = inputName.value.trim();
                            this.#info.username = inputName.value.trim();

                        })
                        .catch(() => {
                            router.go(routes.ERROR_CATCH_VIEW);
                        });
                }
            }
        }

        form.addEventListener('submit', (e) => {
            validation(e);
        });
    }
}