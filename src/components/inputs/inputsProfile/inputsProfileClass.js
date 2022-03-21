import inputsTemplate from '../inputsReg/inputs.pug';
import {edit} from "../../../modules/network";
import router from "../../../routing/router";

const configElement = [
    {
        key: 'name',
        data: '../../static/name.svg',
        placeholder: 'Ваше новое Имя',
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
        placeholder: 'Ваш новый Пароль',
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
        const inputEmail = document.querySelector('input[data-section="email"]');
        inputEmail.readOnly = true;
        inputEmail.value = this.#info.email;

        const inputPassOne = document.querySelector('input[data-section="passwordFirst"]');
        const errorPassOne = document.querySelector('div[data-section="passOneError"]');

        const inputPassTwo = document.querySelector('input[data-section="passwordSecond"]');
        const errorPassTwo = document.querySelector('div[data-section="passTwoError"]');

        const errorIncorr = document.querySelector('div[data-section="profile-info"]');

        const nameError = () => {
            errorName.classList.add('error-active');
            errorName.textContent = 'Заполните поле';
        };

        const passOneErrorLength = () => {
            errorPassOne.classList.add('error-active');
            errorPassOne.innerText = 'Не меньше 8-ми символов';
        };

        const passOneErrorAllow = () => {
            errorPassOne.classList.add('error-active');
            errorPassOne.innerText = 'Необходимы Цифры и Латинские буквы';
        };

        inputName.addEventListener('change', () => {
            if (inputName.value.trim() === '' || inputName.value.length === 1) {
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
            const containsLetters = /^.*[a-zA-Z]+.*$/;
            const minimum8Chars = /^.{8,}$/;
            const containsNumbers = /^.*[0-9]+.*$/;

            if (inputPassOne.value.length === 0) {
                return;
            }

            if (!minimum8Chars.test(inputPassOne.value)) {
                passOneErrorLength();

                return;
            }

            if (!containsNumbers.test(inputPassOne.value)
                || !containsLetters.test(inputPassOne.value)) {
                passOneErrorAllow();

                return;
            }

            errorPassOne.classList.remove('error-active');
        });

        inputPassOne.addEventListener('keydown', () => {
            errorIncorr.classList.remove('error-active');
            errorPassOne.classList.remove('error-active');
        });

        form.addEventListener('submit', (e) => {
            let check = 0;
            let caseForm = 0;

            if (inputName.value.trim() === this.#info.username) {
                caseForm = 1;
            }

            if (!inputName.validity.valid || inputName.value.trim() === '' || inputName.value.length === 1) {
                check++;
                nameError();

                e.preventDefault();
            }

            const containsLetters = /^.*[a-zA-Z]+.*$/;
            const minimum8Chars = /^.{8,}$/;
            const containsNumbers = /^.*[0-9]+.*$/;

            if (inputPassOne.value.length === 0) {
                caseForm += 2;
            } else if (!inputPassOne.validity.valueMissing && !minimum8Chars.test(inputPassOne.value)) {
                check++;
                passOneErrorLength();

                e.preventDefault();
            } else if (!containsNumbers.test(inputPassOne.value)
                || !containsLetters.test(inputPassOne.value)) {
                check++;
                passOneErrorAllow();

                e.preventDefault();
            }

            if (inputPassOne.value.length !== 0 && inputPassTwo.value !== inputPassOne.value) {
                check++;
                errorPassTwo.classList.add('error-active');
                errorPassTwo.textContent = 'Пароли не совпадают';

                e.preventDefault();
            }

            if (check === 0) {
                e.preventDefault();

                let formJson = '';

                if (caseForm !== 3) {
                    formJson = JSON.stringify({
                        username: inputName.value.trim(),
                        password: inputPassOne.value,
                    });
                }

                if (formJson === '') {
                    errorIncorr.classList.add('error-active');
                    errorIncorr.classList.add('center');
                    errorIncorr.textContent = 'Информация не изменилась';

                    return;
                }

                edit(formJson)
                    .then(({ isAuth }) => {
                        if (!isAuth) {
                            errorIncorr.classList.add('error-active');
                            errorIncorr.classList.add('center');
                            errorIncorr.textContent = 'Упс... У нас что-то пошло не так!';

                            return;
                        }

                        errorIncorr.classList.add('error-active');
                        errorIncorr.classList.add('center');
                        errorIncorr.classList.add('success');
                        errorIncorr.textContent = 'Информация обновлена!'

                        const name = document.getElementsByClassName('font-nav name-profile');
                        name[0].textContent = inputName.value.trim();
                })
                .catch((err) => {
                    console.error(err);
                });
            }
        });
    }
}