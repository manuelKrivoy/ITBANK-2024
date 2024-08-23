import { usuarios } from "./usuarios.js";

document.getElementById("loginForm").addEventListener("submit", function (event) {
  console.log("hola");
  console.log(usuarios);
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  const user = usuarios.find((u) => u.user === username && u.pass === password);

  if (user) {
    localStorage.setItem("selectedUser", JSON.stringify(user)); // Guardar datos en localStorage
    window.location.href = "index.html";
  } else {
    errorMessage.style.display = "block";
  }
});
