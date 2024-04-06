import { displayLoading, removeLoading } from "../loading/loading.js";

displayLoading();
setTimeout(() => {
  removeLoading();
}, 2000);

const form = document.querySelector("form");

document.querySelector("#register").addEventListener("click", (event) => {
  event.preventDefault();
  location.href = "/page/register";
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const jsonData = Object.fromEntries(formData);
  const payload = JSON.stringify(jsonData);

  fetchDataToServer(payload);
});

function fetchDataToServer(payload) {
  displayLoading();
  fetch("/page/login", {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`network response was not ok`);

      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.status) {
        location.href = res.path;
      } else window.alert(`Incorrect Password And Username`);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    })
    .finally(() => {
      removeLoading();
    });
}
