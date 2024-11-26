"use client";
import React, { useContext, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { UserContext } from "@/app/context/UserContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Image from "next/image";

const MyCards = ({ type }) => {
  const { user } = useContext(UserContext);
  const [showBalance, setShowBalance] = useState(true);
  const [showCVUCNN, setshowCVUCNN] = useState(false);

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
    return level === "1" ? "#ffffff" : "#000000";
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
            <Typography variant="h5">Cuenta ID: {user.id}</Typography>
            <div onClick={toggleBalanceVisibility} style={{ cursor: "pointer" }}>
              {showBalance ? (
                <VisibilityIcon style={{ color: "white" }} />
              ) : (
                <VisibilityOffIcon style={{ color: "white" }} />
              )}
            </div>
          </Box>
          <Box display="flex" mt={2} alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Saldo: {showBalance ? `$${user.saldoPesos}` : "******"}</Typography>
          </Box>
          <Box display="flex" mt={4} alignItems="center">
            <Typography
              variant="body2"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={toggleCVUVisibility}
            >
              {showCVUCNN ? `CVU: ${user.cvu}` : "Ver CVU"}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">Titular de la tarjeta</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">{user.name}</Typography>
            <Image
              width={80}
              height={20}
              src={`/cards_types/${user.tarjeta_principal?.name || "default"}.png`}
              alt={user.tarjeta_principal?.name || "Usuario"}
              priority
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2">VÁLIDA HASTA</Typography>
            <Typography variant="body2">{user.tarjeta_principal.fecha_expiracion || "12/29"}</Typography>
          </Box>
          <Typography variant="h6" mt={2} display="flex" justifyContent="space-between">
            {user.tarjeta_principal?.numeroTarjeta || "**** **** **** ****"}
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
        color: type === "savings" ? "#fff" : getTextColor(user.tarjeta_principal?.level),
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
