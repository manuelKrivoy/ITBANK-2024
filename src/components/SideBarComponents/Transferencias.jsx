import { useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  Stack,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

const Transferencias = () => {
  const { users, user, modifyCurrencyAmount } = useContext(UserContext);
  const [currency, setCurrency] = useState("$");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const actualUser = user;

  const confirmTransfer = (recipient, currency, amount) => {
    Swal.fire({
      title: "¿Confirmar transferencia?",
      showCancelButton: true,
      confirmButtonColor: "#1a6b2e",
      cancelButtonColor: "#9c2828",
      confirmButtonText: "Transferir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleTransfer(recipient, currency, amount);
      }
    });
  };

  const handleTransfer = (recipient, currency, amount) => {
    if (currency === "USD") {
      if (user.saldoDolares < amount) {
        Swal.fire({
          icon: "error",
          title: "Saldo insuficiente",
          text: "No tienes suficientes dólares para realizar esta transferencia",
        });
        return;
      }
    } else {
      if (user.saldoPesos < amount) {
        Swal.fire({
          icon: "error",
          title: "Saldo insuficiente",
          text: "No tienes suficientes pesos para realizar esta transferencia",
        });
        return;
      }
    }
    modifyCurrencyAmount(currency, amount);
    Swal.fire({
      icon: "success",
      title: "Transferencia realizada",
      text: `Se transfirieron ${amount} ${currency} a ${recipient}`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Descargar Comprobante",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        const pdfUrl = "/plantilla-comprobante.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.setAttribute("download", "comprobante-transferencia.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    });
  };

  // Verifica si alguno de los campos está vacío
  const isButtonDisabled = !recipient || !currency || !amount;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ m: 4 }}>
          Realizar Transferencia Bancaria
        </Typography>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <Select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            >
              {users.map(
                (user) =>
                  actualUser.dni !== user.dni && (
                    <MenuItem key={user.id} value={user.name}>
                      {user.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AccountBalanceIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="$">$</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Monto"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            type="number"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<SendIcon />}
            onClick={() => confirmTransfer(recipient, currency, amount)}
            disabled={isButtonDisabled} // Deshabilita el botón si alguno de los campos está vacío
          >
            Transferir
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Transferencias;
