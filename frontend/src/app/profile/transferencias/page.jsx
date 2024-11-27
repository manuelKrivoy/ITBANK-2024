"use client";
import { useState, useEffect, useContext } from "react";
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
  CircularProgress,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CuentasPage = () => {
  const { user: actualUser, modifyCurrencyAmount } = useContext(UserContext);
  const [currency, setCurrency] = useState("$");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/clientes/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("username:password")}`, // Cambia "username" y "password" por tus credenciales.
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data); // Asume que el formato de respuesta es un arreglo de usuarios.
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
    if (currency === "USD" && actualUser.saldoDolares < amount) {
      Swal.fire({
        icon: "error",
        title: "Saldo insuficiente",
        text: "No tienes suficientes dólares para realizar esta transferencia",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (currency === "$" && actualUser.saldoPesos < amount) {
      Swal.fire({
        icon: "error",
        title: "Saldo insuficiente",
        text: "No tienes suficientes pesos para realizar esta transferencia",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    modifyCurrencyAmount(currency, amount);

    const transferId = Math.random().toString(36).substr(2, 9);
    const queryParams = new URLSearchParams({
      currency,
      amount,
      recipient,
    }).toString();

    router.push(`./transferencias/${transferId}?${queryParams}`);
  };

  const isButtonDisabled = !recipient || !currency || !amount;

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography color="error">{`Error al cargar usuarios: ${error}`}</Typography>
      </Container>
    );
  }

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
            disabled={isButtonDisabled}
          >
            Transferir
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CuentasPage;
