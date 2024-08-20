const usuarios = [
  { user: "manuel.krivoy", pass: "1234", saldo: "10000" },
  { user: "diego.lopez", pass: "1234", saldo: "10000" },
  { user: "francisco.ruslender", pass: "1234", saldo: "10000" },
  { user: "gonzalo.blondi", pass: "1234", saldo: "10000" },
  { user: "tomas.deibe", pass: "1234", saldo: "10000" },
];

var selectedUser = null;

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  const user = usuarios.find((u) => u.user === username && u.pass === password);

  if (user) {
    selectedUser = user;
    window.location.href = "index.html";
  } else {
    errorMessage.style.display = "block";
  }
});

function logout() {
  selectedUser = null;
  window.location.href = "login.html";
}
