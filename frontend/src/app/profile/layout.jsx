"use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "./style.css";

import Footer from "@/app/components/Footer";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { buttonStyles } from "./commonStyles"; // Estilos reutilizables

// Componente independiente para manejar el acceso denegado
const AccessDenied = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="100vh"
      sx={{
        border: "1px solid #ccc",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "40px",
        backgroundColor: "#a2a6b7",
        textAlign: "center",
      }}
    >
      <Image src="/logo/logo.svg" alt="logo" width={300} height={300} />
      <Typography
        variant="h5"
        sx={{
          marginBottom: "24px",
          textAlign: "center",
          fontWeight: "bold",
          padding: "40px",
        }}
      >
        ¡Logeate para acceder a esta sección!
      </Typography>
      <Link href="/login">
        <Button variant="contained" sx={buttonStyles}>
          Iniciar Sesión
        </Button>
      </Link>
    </Box>
  );
};

// Layout principal
export default function RootLayout({ children }) {
  const { user } = useContext(UserContext);
  console.log(user);
  return !user ? (
    <AccessDenied />
  ) : (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <DefaultLayout>
          {children}
          <Footer />
        </DefaultLayout>
      </body>
    </html>
  );
}
