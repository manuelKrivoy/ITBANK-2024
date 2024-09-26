"use client";
import { UserContext } from "@/app/context/UserContext";
import { useContext } from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { Card, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const { user } = useContext(UserContext);
  const [showCNN, setshowCNN] = useState(false);
  const toggleCVUVisibility = () => setshowCNN(!showCNN);

  const getBackgroundColor = (level) => {
    switch (level) {
      case "gold":
        return "#eecc16 "; // color dorado
      case "silver":
        return "#C0C0C0"; // color plateado
      case "black":
        return "#000000"; // color negro
      default:
        return "#E0E0E0"; // color por defecto (gris claro)
    }
  };

  const getTextColor = (level) => {
    return level === "black" ? "#ffffff" : "#000000";
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      {user ? (
        user.cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              backgroundColor: getBackgroundColor(card.level),
              color: getTextColor(card.level),
              padding: "16px",
              borderRadius: "12px",
              minHeight: "100px", // Valores por defecto para dispositivos móviles
              minWidth: "300px",
              backgroundSize: "cover",
              m: 4,
              // Aplicamos los estilos para pantallas medianas (web)
              "@media (min-width: 900px)": {
                minHeight: "200px",
                maxHeight: "250px",
                minWidth: "500px",
                maxWidth: "600px",
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">Titular de la tarjeta</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">{user?.name || "Usuario"}</Typography>
              <Image
                width={80}
                height={20}
                src={`/cards_types/${card.name}.png`}
                alt={card.name || "Usuario"}
                priority
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body2">VÁLIDA HASTA</Typography>
              <Typography variant="body2">{card.expiration || "12/29"}</Typography>
            </Box>
            <Typography variant="h6" mt={2} display="flex" justifyContent="space-between">
              {card.numeroTarjeta || "**** **** **** ****"}
              <Typography variant="body2">{card.cvv}</Typography>
            </Typography>
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary">
          No hay tarjetas disponibles
        </Typography>
      )}
      <Link href={`/profile`}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2", // Color de fondo
            color: "#fff", // Color del texto
            padding: "8px 16px", // Espaciado interno
            borderRadius: "8px", // Bordes redondeados
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra
            textTransform: "none", // Evitar que el texto esté en mayúsculas
            "&:hover": {
              backgroundColor: "#1565c0", // Color de fondo al hacer hover
              boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)", // Mayor sombra en hover
            },
          }}
        >
          Regresar
        </Button>
      </Link>
    </Box>
  );
};

export default Page;
