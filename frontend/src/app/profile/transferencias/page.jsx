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
  const { user: actualUser } = useContext(UserContext);
  const [currency, setCurrency] = useState("$");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [saldos, setSaldos] = useState({});
  const fetchUsers = async () => {
    try {
      const credetenials = localStorage.getItem("authCredentials");
      const response = await fetch("http://localhost:8000/api/clientes/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credetenials}`,
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

  const fetchSaldos = async () => {
    try {
      const credentials = localStorage.getItem("authCredentials");
      const response = await fetch("http://localhost:8000/api/clientes/mi-saldo/", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      const data = await response.json();
      setSaldos(data || {});
    } catch (error) {
      console.error("Error al obtener los saldos:", error);
    }
  };
  const handleType = (event, newType) => {
    if (newType !== null) {
      setType(newType);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSaldos();
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

  const handleTransfer = async (recipient, currency, amount) => {
    const numericAmount = parseFloat(amount); // Convertir el monto a número

    const credentials = localStorage.getItem("authCredentials");
    const recipientId = users.find((user) => user.nombre === recipient)?.id;

    if (!recipientId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró al destinatario",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const transferData = {
      monto: numericAmount, // Aquí se usa el monto convertido a número
      cliente_receptor_id: recipientId,
    };

    try {
      const response = await fetch(
        currency === "USD"
          ? "http://localhost:8000/api/clientes/transferir-usd/"
          : "http://localhost:8000/api/clientes/transferir-pesos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(transferData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Transferencia exitosa",
          text: result.mensaje,
          confirmButtonText: "Aceptar",
        });
        router.push(
          `/profile/transferencias/${result.id}?monto=${result.monto}&clienteEmisor=${result.cliente_emisor}&clienteReceptor=${result.cliente_receptor}`
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en la transferencia",
          text: result.mensaje,
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al realizar la transferencia:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la transferencia",
        text: "Hubo un error al intentar realizar la transferencia. Inténtalo nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
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
                  actualUser.cliente.dni !== user.dni && (
                    <MenuItem key={user.id} value={user.nombre}>
                      {user.nombre} {user.apellido}
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
