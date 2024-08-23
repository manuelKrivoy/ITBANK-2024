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
window.onload = cargarDatosUsuario;

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

//Prestamo

// Función para formatear números como moneda
function formatearMoneda(valor) {
  return valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' ARS';
}

document.getElementById('calcularSimuladores').addEventListener('click', function() {
  // Obtener valores del formulario
  var paquete = document.getElementById('paquete').value;
  var monto = parseFloat(document.getElementById('monto_solicitado').value);
  var plazo = parseInt(document.getElementById('plazo').value);

  if (isNaN(plazo) || plazo <= 0 || plazo > 60) {
    alert(" seleccione un plazo válido (máximo 60 meses).");
    return;
  }

  // Calcular el interés
  var tasaInteresAnual = 0.45;
  var interes = monto * tasaInteresAnual * (plazo / 12); // Interés simple
  var montoTotal = monto + interes;
  var cuotaMensual = montoTotal / plazo;

  // Tabla de cuotas
  var tablaCuotas = '<table border="1"><tr><th>Cuota #</th><th>Pago Mensual</th></tr>';
  for (var i = 1; i <= plazo; i++) {
    tablaCuotas += '<tr><td>' + i + '</td><td>' + formatearMoneda(cuotaMensual) + '</td></tr>';
  }
  tablaCuotas += '</table>';

  // Resultados
  document.getElementById('resultadosImportesYTasas').innerHTML = `
    <p>Paquete seleccionado: ${paquete}</p>
    <p>Monto solicitado: ${formatearMoneda(monto)}</p>
    <p>Plazo en meses: ${plazo}</p>
    <p>Interés calculado: ${formatearMoneda(interes)}</p>
    <p>Monto total a pagar: ${formatearMoneda(montoTotal)}</p>
  `;

  document.getElementById('detalleCuotas').innerHTML = tablaCuotas;
});

//Prestamo
function actualizarMonto() {

  const montoDolares = parseFloat(document.getElementById('inputDolares').value) || 0;
  const tasaDolarMEP = 1235;
  const montoTotalPesos = montoDolares * tasaDolarMEP;

  document.getElementById('resultadoPesos').value = montoTotalPesos.toFixed(2);
}