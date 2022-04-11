import inputsTemplate from '../inputsReg/inputs.pug';
import UserModel from "../../../models/User"
import { regExp } from "Components/inputs/utils/regExp/regExp";
import { textErrors } from "Components/inputs/utils/textErrors/textErrors";

const configElement = [
    {
        key: 'email',
        data: '../../static/email.svg',
        placeholder: 'Почта',
        type: 'email',
        error: 'emailError',
    },
    {
        key: 'password',
        data: '../../static/password.svg',
        placeholder: 'Пароль',
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
                errorEmail.textContent = textErrors.empty;

                return;
            }

            errorEmail.classList.add('error-active');
            errorEmail.textContent = textErrors.wrongEmail;
        };

        const passwordError = () => {
            errorPassword.classList.add('error-active');
            errorPassword.innerText = textErrors.empty;
        };

        inputEmail.addEventListener('change', () => {
            if (regExp.checkEmail.test(inputEmail.value) && inputEmail.value.length !== 0 && inputEmail.validity.valid) {
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

        const validation = (e) => {
            let check = 0;
            if (!inputEmail.validity.valid) {
                check++;
                emailError();

                e.preventDefault();
            }

            if (!regExp.checkEmail.test(inputEmail.value) || inputEmail.value.length === 0 || !inputEmail.validity.valid) {
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

                UserModel.log(formJson);
            }
        }

        form.addEventListener('submit', (e) => {
            validation(e);
        });
    }
}
