import React, { useContext } from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import MyCards from "./MyCards";
import { UserContext } from "../../context/UserContext";
import ConversorDivisas from "./ConversorDivisas";
import PrestamoSimulador from "./PrestamoSimulador";
import TransaccionesRecientes from "./TransaccionesRecientes";

const HomeProfile = () => {
  const { user } = useContext(UserContext);
  const transactions = [
    { description: "Depósito desde mi tarjeta", date: "25 Enero 2021", amount: "- $500" },
    { description: "Depósito Paypal", date: "25 Enero 2021", amount: "+ $500" },
    { description: "Retiro", date: "25 Enero 2021", amount: "- $500" },
  ];

  return (
    <Container className="container" sx={{ maxWidth: "100%", overflowX: "hidden", paddingX: { xs: 2, md: 3 } }}>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, <span style={{ color: "#3f51b5" }}>{user?.name || "Usuario"}</span>
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={3}>
          <Box flexBasis={{ xs: "100%", md: "48%" }}>
            <MyCards color="#3f51b5" type="savings" />
          </Box>
          <Box flexBasis={{ xs: "100%", md: "48%" }}>
            <MyCards color="#9e9e9e" type="credit" />
          </Box>
        </Box>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Novedades
          </Typography>
          <img src="/novedades.png" alt="Novedades" style={{ width: "100%", borderRadius: "12px" }} />
        </Box>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Simulador de Préstamos
          </Typography>
          <Box sx={{ maxWidth: "100%", overflowX: "hidden" }}>
            <PrestamoSimulador />
          </Box>
        </Box>
        <Box mt={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" gutterBottom>
              Movimientos
            </Typography>
            <Link href="#" variant="body2" style={{ marginRight: "20px" }}>
              Ver todos
            </Link>
          </Box>
          <TransaccionesRecientes transactions={transactions} />
        </Box>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Conversor de divisas
          </Typography>
          <ConversorDivisas />
        </Box>
      </Box>
    </Container>
  );
};

export default HomeProfile;
