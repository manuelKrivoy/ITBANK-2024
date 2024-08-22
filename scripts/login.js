const usuarios = [
  { user: "manuel.krivoy", pass: "1234", saldo: "10000" },
  { user: "diego.lopez", pass: "1234", saldo: "10000" },
  { user: "francisco.ruslender", pass: "1234", saldo: "10000" },
  { user: "gonzalo.blondi", pass: "1234", saldo: "10000" },
  { user: "tomas.deibe", pass: "1234", saldo: "10000" },
];

document.getElementById("loginForm").addEventListener("submit", function (event) {
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
