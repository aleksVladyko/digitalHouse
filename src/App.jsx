import { useEffect } from "react";
import "./App.scss";

function App() {
    useEffect(() => {
        const form = document.getElementById("section-form");

        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // Предотвращаем отправку формы по умолчанию

                // Получаем значения полей формы
                const nameInput = document.getElementById("name");
                const phoneInput = document.getElementById("phone");
                const emailInput = document.getElementById("email");
                const messageTextarea = document.getElementById("message");

                const name = nameInput.value;
                const phone = phoneInput.value;
                const email = emailInput.value;
                const message = messageTextarea.value;
                console.log(message);
                // Производим валидацию полей
                let isValid = true;

                if (name.trim() === "") {
                    isValid = false;
                    nameInput.classList.add("error");
                } else {
                    nameInput.classList.remove("error");
                }

                if (phone.trim() === "") {
                    isValid = false;
                    phoneInput.classList.add("error");
                } else {
                    phoneInput.classList.remove("error");
                }
                // валидность так же можно проверить в разметке input
                if (email.trim() !== "") {
                    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(email)) {
                        isValid = false;
                        emailInput.classList.add("error");
                    } else {
                        emailInput.classList.remove("error");
                    }
                }

                // Дополнительная валидация для формата телефона
                // var phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
                // if (!phonePattern.test(phone)) {
                //     isValid = false;
                //     phoneInput.classList.add("error");
                // } else {
                //     phoneInput.classList.remove("error");
                // }

                // Проверяем общую валидность формы
                if (isValid) {
                    fetch("https://fakestoreapi.com/products", {
                        method: "POST",
                        // headers: {
                        //     "Content-Type": "application/json",
                        // },
                        body: JSON.stringify({
                            name: name,
                            phone: phone,
                            email: email,
                            message: message,
                        }),
                    })
                        .then((response) => {
                            if (response.ok) {
                                // Успешная отправка формы
                                alert("Форма успешно отправлена!");
                                console.log("Имя:", name);
                                console.log("Телефон:", phone);
                                console.log("Email:", email);
                                console.log("Сообщение:", message);

                                // Получаем и выводим ответ
                                return response.json();
                            } else {
                                throw new Error(
                                    "Произошла ошибка при отправке формы."
                                );
                            }
                        })
                        .then((data) => {
                            console.log("Ответ сервера:", data);
                        })
                        .catch((error) => {
                            console.log("Ошибка:", error);
                            alert("Произошла ошибка при отправке формы.");
                        });

                    // Сбрасываем значения полей
                    nameInput.value = "";
                    phoneInput.value = "";
                    emailInput.value = "";
                    messageTextarea.value = "";
                }
            });
        }
    }, []);

    return (
        <>
            <section className="wrapper">
                <h1 className="title-forme">Обратная форма</h1>
                <form id="section-form">
                    <div className="form-fieldset-input">
                        <fieldset className="form-group-name">
                            <legend>Имя</legend>
                            <input
                                type="text"
                                placeholder="Имя"
                                id="name"
                                name="name"
                                required
                            />
                            <label htmlFor="name" />
                        </fieldset>
                        <fieldset className="form-group-phone">
                            <legend>Телефон</legend>
                            <label htmlFor="phone" />
                            <input
                                placeholder="+7 (999) 999-99-99"
                                type="tel"
                                id="phone"
                                name="phone"
                                pattern="\+\d{1,3} \(\d{3}\) \d{3}-\d{2}-\d{2}"
                                title="Введите номер телефона в формате: +7 (999) 999-99-99"
                                required
                            />
                        </fieldset>
                        <fieldset className="form-group-mail">
                            <legend>Email</legend>
                            <label htmlFor="email" />
                            <input
                                placeholder="mail@example.com"
                                type="email"
                                id="email"
                                name="email"
                            />
                        </fieldset>
                        <div className="form-wrapper-textarea">
                            <fieldset className="form-group-textarea">
                                <legend>Сообщение</legend>
                                <label htmlFor="message" />
                                <textarea
                                    className="form-input-textarea"
                                    placeholder="Введите текст"
                                    id="message"
                                    name="message"
                                />
                            </fieldset>
                        </div>
                    </div>
                    <span>
                        Отправляя форму, Вы соглашаетесь на {""}
                        <a href=""> обработку персональных данных</a>
                    </span>

                    <div>
                        <button type="submit">Отправить</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default App;
