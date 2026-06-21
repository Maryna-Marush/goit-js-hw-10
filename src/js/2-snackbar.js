import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    createPromise(delay, state)
        .then((delay) => {
            iziToast.success({
                // Прибираємо title, оскільки на скріншоті-прикладі є лише одне повідомлення без окремого заголовка
                message: `Fulfilled promise in ${delay}ms`,
                position: "topRight",
                backgroundColor: "#59b159", // Зелений колір як на вашому макеті
                messageColor: "#ffffff",
                close: false, // Прибираємо хрестик, якщо хочеться максимальної схожості
            });
        })
        .catch((delay) => {
            iziToast.error({
                message: `Rejected promise in ${delay}ms`,
                position: "topRight",
                backgroundColor: "#ef4040", // Червоний колір для помилки
                messageColor: "#ffffff",
                close: false,
            });
        });

    form.reset();
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}
