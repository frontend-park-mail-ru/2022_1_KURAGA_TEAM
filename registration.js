'use script'

const root = document.getElementById("root");

const back = document.createElement("div");
back.id = "back";
root.appendChild(back);

const logo = document.createElement("object");
logo.id = "logo";
logo.type = "image/svg+xml";
logo.data = "static/Logo.svg";
root.appendChild(logo);

const backMenu = document.createElement("div");
backMenu.id = "back-menu";
root.appendChild(backMenu);

const menu = document.createElement("div");
menu.id = "menu";
backMenu.appendChild(menu);

const reg = document.createElement("h1")
reg.textContent = "Регистрация";
menu.appendChild(reg);

const form = document.createElement("form");
form.method = "post";
form.action = ".";
form.noValidate = true;
menu.appendChild(form);

const menuElement1 = document.createElement("div");
menuElement1.classList.add("element");
form.appendChild(menuElement1);

const name = document.createElement("object");
name.id = "svg";
name.type = "image/svg+xml";
name.data = "static/name.svg";
menuElement1.appendChild(name);

const nameInput = document.createElement("input");
nameInput.placeholder = "Введите Имя";
nameInput.type = "text";
nameInput.required = true;
menuElement1.appendChild(nameInput);

const errorName = document.createElement("div");
errorName.classList.add("error");

nameInput.addEventListener('change', () => {
    if (nameInput.validity.valid) {
        form.removeChild(errorName);

        return;
    }

    nameError();
});

function nameError() {
    if(nameInput.validity.valueMissing) {
        form.insertBefore(errorName, menuElement2);
        errorName.textContent = 'Заполните поле';
    }
}

const menuElement2 = document.createElement("div");
menuElement2.classList.add("element");
form.appendChild(menuElement2);

const email = document.createElement("object");
email.id = "svg";
email.type = "image/svg+xml";
email.data = "static/email.svg";
menuElement2.appendChild(email);

const emailInput = document.createElement("input");
emailInput.placeholder = "Введите Почту";
emailInput.type = "email";
emailInput.required = true;
menuElement2.appendChild(emailInput);

const errorEmail = document.createElement("div");
errorEmail.classList.add("error");

emailInput.addEventListener('change', () => {
    if (emailInput.validity.valid) {
        form.removeChild(errorEmail);

        return;
    }

    emailError();
});

function emailError() {
    if(emailInput.validity.valueMissing) {
        form.insertBefore(errorEmail, menuElement3);
        errorEmail.textContent = 'Заполните поле';

        return;
    }

    if(emailInput.validity.typeMismatch) {
        form.insertBefore(errorEmail, menuElement3);
        errorEmail.textContent = 'Введите действительный email';
    }
}

const menuElement3 = document.createElement("div");
menuElement3.classList.add("element");
form.appendChild(menuElement3);

const password1 = document.createElement("object");
password1.id = "svg";
password1.type = "image/svg+xml";
password1.data = "static/password.svg";
menuElement3.appendChild(password1);

const passwordInput1 = document.createElement("input");
passwordInput1.placeholder = "Введите Пароль";
passwordInput1.type = "password";
passwordInput1.required = true;
menuElement3.appendChild(passwordInput1);

const errorPassOne = document.createElement("div");
errorPassOne.classList.add("error");

passwordInput1.addEventListener('change', () => {
    const containsLetters = /^.*[a-zA-Z]+.*$/;
    const minimum8Chars = /^.{8,}$/;
    const containsNumbers = /^.*[0-9]+.*$/;

    if (passwordInput1.validity.valid &&
        containsNumbers.test(passwordInput1.value) &&
        containsLetters.test(passwordInput1.value) &&
        minimum8Chars.test(passwordInput1.value)) {
        form.removeChild(errorPassOne);

        return;
    }

    passOneError();
});

function passOneError() {
    form.insertBefore(errorPassOne, menuElement4);
    errorPassOne.innerText = 'Пароль должен содержать не менее \n 8-ми символов и латинские буквы';
}

const menuElement4 = document.createElement("div");
menuElement4.classList.add("element");
form.appendChild(menuElement4);

const password2 = document.createElement("object");
password2.id = "svg";
password2.type = "image/svg+xml";
password2.data = "static/password.svg";
menuElement4.appendChild(password2);

const passwordInput2 = document.createElement("input");
passwordInput2.placeholder = "Повторите Пароль";
passwordInput2.type = "password";
passwordInput2.required = true;
menuElement4.appendChild(passwordInput2);

const errorPassTwo = document.createElement("div");
errorPassTwo.classList.add("error");

passwordInput2.addEventListener('change', () => {
    if (passwordInput2.validity.valid) {
        form.removeChild(errorPassTwo);

        return;
    }

    passTwoError();
});

function passTwoError() {
    if(passwordInput2.validity.valueMissing) {
        form.insertBefore(errorPassTwo, button);
        errorPassTwo.textContent = 'Заполните поле';
    }
}

const button = document.createElement("button");
button.type = "submit";
button.textContent = "Зарегистрироваться";
form.appendChild(button);

form.addEventListener('submit', (e) => {
    if(!nameInput.validity.valid) {
        nameError();

        e.preventDefault();
    }

    if(!emailInput.validity.valid) {
        emailError();

        e.preventDefault();
    }

    if(!passwordInput1.validity.valid) {
        passOneError();

        e.preventDefault();
    }

    if(passwordInput2.value !== passwordInput1.value) {
        form.insertBefore(errorPassTwo, button);
        errorPassTwo.textContent = 'Пароли не совпадают';

        e.preventDefault();
    }

    if(!passwordInput2.validity.valid) {
        passTwoError();

        e.preventDefault();
    }
});

const text = document.createElement("div");
text.id = "text";
menu.appendChild(text);

const spanFirst = document.createElement("span");
spanFirst.id = "first-span";
spanFirst.textContent = "Есть аккаунт?";
text.appendChild(spanFirst);

const spanSecond = document.createElement("a");
spanSecond.href = ".";
spanSecond.id = "second-span";
spanSecond.textContent = "Войдите";
text.appendChild(spanSecond);

const footer = document.createElement("footer");
footer.id = "footer";
root.appendChild(footer);

const firstFooter = document.createElement("div");
firstFooter.id = "first-footer";
footer.appendChild(firstFooter);

const cont = document.createElement("div");
cont.classList.add("title");
cont.textContent = "Контакты";
firstFooter.appendChild(cont);

const address = document.createElement("div");
address.classList.add("content");
address.textContent = "Москва. ул. 2-ая Бауманская, д. 5";
firstFooter.appendChild(address);

const ourEmail = document.createElement("div");
ourEmail.classList.add("content");
ourEmail.textContent = "kuraga_team@moviespace.com";
firstFooter.appendChild(ourEmail);

const secondFooter = document.createElement("div");
secondFooter.id = "second-footer";
footer.appendChild(secondFooter);

const info = document.createElement("div");
info.classList.add("title");
info.textContent = "Информация";
secondFooter.appendChild(info);

const year = document.createElement("div");
year.classList.add("content");
year.textContent = "© 2022–2022 Movie Space.";
secondFooter.appendChild(year);

const disc = document.createElement("div");
disc.classList.add("content");
disc.textContent = "Может содержать информацию, не предназначенную для несовершеннолетних";
secondFooter.appendChild(disc);

const thirdFooter = document.createElement("div");
thirdFooter.id = "third-footer";
footer.appendChild(thirdFooter);

const fourthFooter = document.createElement("div");
fourthFooter.id = "fourth-footer";
footer.appendChild(fourthFooter);

const refT = document.createElement("a");
refT.href = "/";
fourthFooter.appendChild(refT);

const telegram = document.createElement("img");
telegram.classList.add("refer");
telegram.src = "static/telegram.png";
refT.appendChild(telegram);

const refI = document.createElement("a");
refI.href = "https://www.instagram.com/danyatarnovskiy/";
fourthFooter.appendChild(refI);

const inst = document.createElement("img");
inst.classList.add("refer");
inst.src = "static/insta.png";
refI.appendChild(inst);

const refV = document.createElement("a");
refV.href = "https://vk.com/dtarnovsky";
fourthFooter.appendChild(refV);

const vk = document.createElement("img");
vk.classList.add("refer");
vk.src = "static/vk.png";
refV.appendChild(vk);
