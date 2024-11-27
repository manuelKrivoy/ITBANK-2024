"use client";
import React, { use, useContext, useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { UserContext } from "@/app/context/UserContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Image from "next/image";

const MyCards = ({ type }) => {
  const [saldos, setSaldos] = useState({});
  const { user } = useContext(UserContext);
  const [showBalance, setShowBalance] = useState(true);
  const [showCVUCNN, setshowCVUCNN] = useState(false);
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

  useEffect(() => {
    fetchSaldos();
  }, []);

  const getBackgroundColor = (level) => {
    switch (level) {
      case "1":
        return "#eecc16 "; // color dorado
      case "2":
        return "#C0C0C0"; // color plateado
      case "3":
        return "#000000"; // color negro
      default:
        return "#E0E0E0"; // color por defecto (gris claro)
    }
  };

  const getTextColor = (level) => {
    return level === "3" ? "#ffffff" : "#000000";
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  const toggleBalanceVisibility = () => setShowBalance((prev) => !prev);
  const toggleCVUVisibility = () => setshowCVUCNN((prev) => !prev);

  const renderCardContent = () => (
    <>
      {type === "savings" ? (
        <>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Cuenta ID: {user.cliente.id}</Typography>
            <div onClick={toggleBalanceVisibility} style={{ cursor: "pointer" }}>
              {showBalance ? (
                <VisibilityIcon style={{ color: "white" }} />
              ) : (
                <VisibilityOffIcon style={{ color: "white" }} />
              )}
            </div>
          </Box>
          <Box display="flex" mt={2} alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Saldo: {showBalance ? `$${saldos.saldo_pesos}` : "******"}</Typography>
          </Box>
          <Box display="flex" mt={4} alignItems="center">
            <Typography
              variant="body2"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={toggleCVUVisibility}
            >
              {showCVUCNN ? `CVU: ${user.cliente.cvu}` : "Ver CVU"}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">Titular de la tarjeta</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              {user.cliente.nombre} {user.cliente.apellido}
            </Typography>
            <Image
              width={80}
              height={20}
              src={`/cards_types/${user.tarjeta_principal?.marca || "default"}.png`}
              alt={user.cliente.nombre + user.cliente.apellido || "Usuario"}
              priority
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2">VÁLIDA HASTA</Typography>
            <Typography variant="body2">{user.tarjeta_principal.fecha_expiracion || "12/29"}</Typography>
          </Box>
          <Typography variant="h6" mt={2} display="flex" justifyContent="space-between">
            {user.tarjeta_principal?.numero || "**** **** **** ****"}
            <Typography
              variant="body2"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={toggleCVUVisibility}
            >
              {showCVUCNN ? ` ${user.tarjeta_principal?.cvv || "No disponible"}` : "Ver CVV"}
            </Typography>
          </Typography>
        </>
      )}
    </>
  );

  return (
    <Card
      sx={{
        backgroundColor: getBackgroundColor(user.tarjeta_principal?.background),
        color: type === "savings" ? "#fff" : getTextColor(user.tarjeta_principal?.background),
        padding: "16px",
        borderRadius: "12px",
        minHeight: "200px",
        backgroundImage: type === "savings" ? "url(/Balance.png)" : "none",
        backgroundSize: "cover",
      }}
    >
      <CardContent>{renderCardContent()}</CardContent>
    </Card>
  );
};

export default MyCards;
