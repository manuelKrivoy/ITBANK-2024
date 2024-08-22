//Funcionalidad cargar datos de usuario
function cargarDatosUsuario() {
  const user = JSON.parse(localStorage.getItem("selectedUser"));

  if (user) {
    document.querySelector("#menu_lateral ul li:first-child a").textContent = user.user; // Mostrar el nombre de usuario
    document.getElementById("saldo").textContent = "$" + user.saldo; // Mostrar el saldo
  } else {
    // Si no hay usuario seleccionado, redirigir a login.html
    window.location.href = "login.html";
  }
}

// Mostrar sección seleccionada
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.style.display = "none";
  });
  
  document.getElementById(sectionId).style.display = "block";
}

//Funcionalidad mostrar / no mostrar saldo
var verSaldo = true;

function mostrarSaldo() {
  if (verSaldo) {
    document.getElementById("saldo").textContent = "$*****";
  } else {
    const user = JSON.parse(localStorage.getItem("selectedUser"));
    document.getElementById("saldo").textContent = "$" + user.saldo;
  }
  verSaldo = !verSaldo;
}
window.onload = cargarDatosUsuario;

//Funcionalidad logout
function logout() {
  localStorage.removeItem("selectedUser"); // Eliminar datos de localStorage
  window.location.href = "login.html";
}

//Funcionalidad menu lateral mobile
function toggleMenu() {
  const menu = document.getElementById("menu_lateral");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}
