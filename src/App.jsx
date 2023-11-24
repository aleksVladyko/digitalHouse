import { useEffect } from "react";
import "./App.scss";

function App() {
    useEffect(() => {
        const form = document.getElementById("section-form");

        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();

                const formData = new FormData(form);

                // Производим валидацию полей
                let isValid = true;

                if (
                    formData.get("name").trim() === "" ||
                    formData.get("phone").trim() === ""
                ) {
                    isValid = false;
                    form.name.classList.add("error");
                } else {
                    form.name.classList.remove("error");
                }

                // Валидация email (если нужно)
                if (formData.get("email").trim() !== "") {
                    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(formData.get("email"))) {
                        isValid = false;
                        form.email.classList.add("error");
                    } else {
                        form.email.classList.remove("error");
                    }
                }

                // Проверяем общую валидность формы
                if (isValid) {
                    fetch("https://fakestoreapi.com/products", {
                        method: "POST",
                        // headers: {
                        //     "Content-Type": "application/json",
                        // },
                        body: formData,
                    })
                        .then((response) => {
                            if (response.ok) {
                                // Успешная отправка формы
                                alert("Форма успешно отправлена!");
                                console.log("Имя:", formData.get("name"));
                                console.log("Телефон:", formData.get("phone"));
                                console.log("Email:", formData.get("email"));
                                console.log(
                                    "Сообщение:",
                                    formData.get("message")
                                );
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
                    form.reset();
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
                                    maxLength={100}
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
