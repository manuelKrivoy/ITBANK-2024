"use client";

import DefaultLayout from "../components/Layouts/DefaultLayout";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ToggleButton, ToggleButtonGroup, Typography, Box, Paper } from "@mui/material";
import { useEffect } from "react";

const CuentasPage = () => {
  const [type, setType] = useState("pesos");
  const [saldos, setSaldos] = useState({});
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
    fetchSaldos();
  }, []);
  const balance = type === "pesos" ? saldos.saldo_pesos : saldos.saldo_usd;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        marginBottom: 50,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 3,
          borderRadius: 4,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Selecciona tu cuenta
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleType}
          aria-label="Tipo de cuenta"
          sx={{ marginBottom: 3 }}
        >
          <ToggleButton
            value="pesos"
            sx={{
              borderRadius: "16px",
              "&.Mui-selected": {
                backgroundColor: "#42a5f5",
                color: "#fff",
              },
            }}
          >
            ARS
          </ToggleButton>
          <ToggleButton
            value="usd"
            sx={{
              borderRadius: "16px",
              "&.Mui-selected": {
                backgroundColor: "#3aa066",
                color: "#fff",
              },
            }}
          >
            USD
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Saldo actual:
        </Typography>
        <Typography variant="h4" sx={{ color: type === "pesos" ? "#42a5f5" : "#3aa066" }}>
          {type === "pesos" ? `ARS $${balance}` : `USD $${balance}`}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CuentasPage;
