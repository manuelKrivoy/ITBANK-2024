"use client";
import { useState, useEffect } from "react";
import { Card, Button, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [userData, setUserData] = useState({});
  const fetchTarjetas = async () => {
    try {
      const credentials = localStorage.getItem("authCredentials");
      const response = await fetch("http://localhost:8000/api/tarjetas/mis-tarjetas/", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      const data = await response.json();
      console.log(data); // Verifica los datos recibidos
      setTarjetas(Array.isArray(data.tarjetas) ? data.tarjetas : []);
      setUserData(data.cliente || {});
    } catch (error) {
      console.error("Error al obtener las tarjetas:", error);
    }
  };

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

  useEffect(() => {
    fetchTarjetas();
  }, []);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      {userData ? (
        tarjetas.map((card) => (
          <Card
            key={card.id}
            sx={{
              backgroundColor: getBackgroundColor(card.background),
              color: getTextColor(card.background),
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
              <Typography variant="h6">{userData?.nombre + " " + userData?.apellido || "Usuario"}</Typography>
              <Image
                width={80}
                height={20}
                src={`/cards_types/${card.marca}.png`}
                alt={card.marca || "marca"}
                priority
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body2">VÁLIDA HASTA</Typography>
              <Typography variant="body2">{card.fecha_expiracion || "12/29"}</Typography>
            </Box>
            <Typography variant="h6" mt={2} display="flex" justifyContent="space-between">
              {card.numero || "**** **** **** ****"}
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
