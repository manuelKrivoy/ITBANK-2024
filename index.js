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

window.onload = cargarDatosUsuario;

function logout() {
  localStorage.removeItem("selectedUser"); // Eliminar datos de localStorage
  window.location.href = "login.html";
}
