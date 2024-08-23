import { usuarios } from "./usuarios.js";

const populateUserOptions = () => {
  const usersSelect = document.getElementById("users");
  const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));

  usuarios.forEach((usuario) => {
    if (usuario.user !== selectedUser.user) {
      const option = document.createElement("option");
      option.value = usuario.user;
      option.textContent = `${usuario.user}`;
      usersSelect.appendChild(option);
    }
  });
};

document.addEventListener("DOMContentLoaded", populateUserOptions);

const transferencia = (origen, destino, monto) => {
  const usuarioOrigen = usuarios.find((usuario) => usuario.user === origen);
  const usuarioDestino = usuarios.find((usuario) => usuario.user === destino);

  if (!usuarioOrigen || !usuarioDestino) {
    return { success: false, message: "Usuario no encontrado" };
  } else if (usuarioOrigen.saldo < monto || !usuarioOrigen.saldo) {
    //chequea que tenga saldo o que saldo no sea null
    return { success: false, message: "Saldo insuficiente" };
  } else if (monto <= 0) {
    //chequea que tenga saldo o que saldo no sea null
    return { success: false, message: "Ingrese un monto valido" };
  } else {
    usuarioOrigen.saldo -= monto;
    usuarioDestino.saldo += monto;

    // Actualizar localStorage con el nuevo saldo del usuario origen
    localStorage.setItem("selectedUser", JSON.stringify(usuarioOrigen));
    return {
      success: true,
      message: "Transferencia realizada",
      data: { origen, destino, monto },
    };
  }
};

document.getElementById("transferForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const origen = selectedUser.user;
  const destino = document.getElementById("users").value;
  const monto = parseFloat(document.getElementById("amount").value);

  const result = transferencia(origen, destino, monto);

  if (result.success) {
    Swal.fire({
      title: "Transferencia realizada con éxito",
      html: `Monto: $${result.data.monto} <hr> Origen: <b>${result.data.origen}</b> <br> Destinatario: <b>${result.data.destino}</b> `,

      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Error",
      text: result.message,
      icon: "error",
    });
  }
});
