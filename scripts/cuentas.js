function cargarDatosCuentas() {
  console.log("Cargando datos de cuentas...");
  // Obtener el saldo de dólares y pesos desde el localStorage
  const user = JSON.parse(localStorage.getItem("selectedUser"));
  console.log(user);
  // Mostrar el saldo en el HTML
  document.getElementById("cuenta-dolares").querySelector("p").textContent = `Saldo:  US$${user.usd} `;
  document.getElementById("cuenta-pesos").querySelector("p").textContent = `Saldo: $${user.saldo}`;
}
window.onload = cargarDatosCuentas();

function showDetallesUsd() {
  Swal.fire({
    title: "Caja de Ahorro en Dólares",
    text: "Una caja de ahorro en dólares es una cuenta bancaria que permite a los usuarios mantener su dinero en dólares estadounidenses, lo cual puede ser útil para protegerse contra la devaluación de la moneda local.",
    icon: "info",
    confirmButtonText: "Entendido",
  });
}

function showDetallesPesos() {
  Swal.fire({
    title: "Caja de Ahorro en Pesos",
    text: "Una caja de ahorro en pesos es una cuenta bancaria que permite a los usuarios mantener su dinero en la moneda local, generalmente con la posibilidad de ganar intereses.",
    icon: "info",
    confirmButtonText: "Entendido",
  });
}
