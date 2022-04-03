import inputsTemplate from '../inputsReg/inputs.pug';
import UserModel from "../../../models/User"
import router from '../../../routing/router.js';

const configElement = [
    {
        key: 'email',
        data: '../../static/email.svg',
        placeholder: 'Введите Почту',
        type: 'email',
        error: 'emailError',
    },
    {
        key: 'password',
        data: '../../static/password.svg',
        placeholder: 'Введите Пароль',
        type: 'password',
        error: 'passwordError',
    },
];

export default class InputsClass {
    render() {
        return inputsTemplate({items: configElement});
    }

    setHandler() {
        const form = document.querySelector('.menu-form');

        const inputEmail = document.querySelector('input[data-section="email"]');
        const errorEmail = document.querySelector('div[data-section="emailError"]');

        const inputPassword = document.querySelector('input[data-section="password"]');
        const errorPassword = document.querySelector('div[data-section="passwordError"]');

        const errorIncorr = document.querySelector('div[data-section="incorrect"]');

        const emailError = () => {
            if (inputEmail.validity.valueMissing) {
                errorEmail.classList.add('error-active');
                errorEmail.textContent = 'Заполните поле';

                return;
            }

            errorEmail.classList.add('error-active');
            errorEmail.textContent = 'Введите действительный email';
        };

        const passwordError = () => {
            errorPassword.classList.add('error-active');
            errorPassword.innerText = 'Заполните поле';
        };

        inputEmail.addEventListener('change', () => {
            const checkEmail = /.+@.+\..+/i;

            if (checkEmail.test(inputEmail.value) && inputEmail.value.length !== 0 && inputEmail.validity.valid) {
                errorEmail.classList.remove('error-active');

                return;
            }

            emailError();
        });

        inputEmail.addEventListener('keydown', () => {
            errorIncorr.classList.remove('error-active');
            errorEmail.classList.remove('error-active');
        });

        inputPassword.addEventListener('change', () => {
            if (inputPassword.validity.valid) {
                errorPassword.classList.remove('error-active');

                return;
            }

            passwordError();
        });

        inputPassword.addEventListener('keydown', () => {
            errorIncorr.classList.remove('error-active');
            errorPassword.classList.remove('error-active');
        });

        form.addEventListener('submit', (e) => {
            let check = 0;
            if (!inputEmail.validity.valid) {
                check++;
                emailError();

                e.preventDefault();
            }

            const checkEmail = /.+@.+\..+/i;

            if (!checkEmail.test(inputEmail.value) || inputEmail.value.length === 0 || !inputEmail.validity.valid) {
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

                UserModel.login(formJson);
            }
        });
    }
}
