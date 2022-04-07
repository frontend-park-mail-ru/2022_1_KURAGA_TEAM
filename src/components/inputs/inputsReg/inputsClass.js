import inputsTemplate from './inputs.pug';
import router from '../../../routing/router.js';
import UserModel from "../../../models/User"
const configElement = [
    {
        key: 'name',
        data: '../../static/name.svg',
        placeholder: 'Введите Имя',
        type: 'text',
        error: 'nameError',
    },
    {
        key: 'email',
        data: '../../static/email.svg',
        placeholder: 'Введите Почту',
        type: 'email',
        error: 'emailError',
    },
    {
        key: 'passwordFirst',
        data: '../../static/password.svg',
        placeholder: 'Введите Пароль',
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

export default class InputsClass {
    render() {
        return inputsTemplate({items: configElement});
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
            if (inputName.value.length === 1 || inputName.value.match(/<script>/) !== null
                || inputName.value.match(/<img>/) !== null) {
                errorName.classList.add('error-active');
                errorName.textContent = 'Неправильные данные';

                return;
            }

            errorName.classList.add('error-active');
            errorName.textContent = 'Заполните поле';
        };

        const emailError = () => {
            if (inputEmail.validity.valueMissing) {
                errorEmail.classList.add('error-active');
                errorEmail.textContent = 'Заполните поле';

                return;
            }

            errorEmail.classList.add('error-active');
            errorEmail.textContent = 'Введите действительный email';
        };

        const passOneErrorEmpty = () => {
            errorPassOne.classList.add('error-active');
            errorPassOne.textContent = 'Заполните поле';
        };

        const passOneErrorLength = () => {
            errorPassOne.classList.add('error-active');
            errorPassOne.innerText = 'Не меньше 8-ми символов';
        };

        const passOneErrorAllow = () => {
            errorPassOne.classList.add('error-active');
            errorPassOne.innerText = 'Только Цифры и Латинские буквы';
        };

        const passTwoError = () => {
            errorPassTwo.classList.add('error-active');
            errorPassTwo.textContent = 'Заполните поле';
        };

        inputName.addEventListener('change', () => {
            if (inputName.value.trim() === '' || inputName.value.length === 1
                || inputName.value.match(/<script>/) !== null || inputName.value.match(/<img>/) !== null) {
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
            errorName.classList.remove('error-active');
        });

        inputEmail.addEventListener('change', () => {
            const checkEmail = /.+@.+\..+/i;

            if (checkEmail.test(inputEmail.value) && inputEmail.value.length !== 0 && inputEmail.validity.valid) {
                errorEmail.classList.remove('error-active');

                return;
            }

            emailError();
        });

        inputEmail.addEventListener('keydown', () => {
            errorEmail.classList.remove('error-active');
        });

        inputPassOne.addEventListener('change', () => {
            const containsLetters = /^.*[a-zA-Z]+.*$/;
            const minimum8Chars = /^.{8,}$/;
            const containsNumbers = /^.*[0-9]+.*$/;

            if (!inputPassOne.validity.valid) {
                passOneErrorEmpty();

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
            errorPassOne.classList.remove('error-active');
        });

        inputPassTwo.addEventListener('change', () => {
            if (inputPassTwo.validity.valid) {
                errorPassTwo.classList.remove('error-active');

                return;
            }

            passTwoError();
        });

        inputPassTwo.addEventListener('keydown', () => {
            errorPassTwo.classList.remove('error-active');
        });

        form.addEventListener('submit', (e) => {
            let check = 0;
            if (!inputName.validity.valid || inputName.value.trim() === '' || inputEmail.value.length === 1) {
                check++;
                nameError();

                e.preventDefault();
            }

            const checkEmail = /.+@.+\..+/i;

            if (!checkEmail.test(inputEmail.value) || inputEmail.value.length === 0 || !inputEmail.validity.valid) {
                check++;
                emailError();

                e.preventDefault();
            }

            const containsLetters = /^.*[a-zA-Z]+.*$/;
            const minimum8Chars = /^.{8,}$/;
            const containsNumbers = /^.*[0-9]+.*$/;

            if (!inputPassOne.validity.valid) {
                check++;
                passOneErrorEmpty();

                e.preventDefault();
            } else if (!minimum8Chars.test(inputPassOne.value)) {
                check++;
                passOneErrorLength();

                e.preventDefault();
            } else if (!containsNumbers.test(inputPassOne.value)
                || !containsLetters.test(inputPassOne.value)) {
                check++;
                passOneErrorAllow();

                e.preventDefault();
            }

            if (inputPassTwo.value !== inputPassOne.value) {
                check++;
                errorPassTwo.classList.add('error-active');
                errorPassTwo.textContent = 'Пароли не совпадают';

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
        });
    }
}
