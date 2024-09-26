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
import { keyframes } from "@mui/system";
import Image from "next/image";
const buttonHoverEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function RootLayout({ children }) {
  const { user } = useContext(UserContext);

  return !user.name ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%" // Asegurarse de que ocupe el 100% en pantallas móviles
      height="100vh"
      sx={{
        border: "1px solid #ccc",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "40px",
        backgroundColor: "#a2a6b7",
        textAlign: "center",
      }}
    >
      <Image src="/logo/logo.svg" alt="logo" width={300} height={300}></Image>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "24px",
          textAlign: "center",
          fontWeight: "bold", // Tipografía con más peso
          animation: `${buttonHoverEffect} 2s infinite`, // Animación suave
          padding: "40px",
        }}
      >
        ¡Logeate para acceder a esta sección!
      </Typography>
      <Link href="/login">
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(45deg, #19415c, #367cab)", // Gradiente como en el NotFound
            color: "#fff",
            padding: "12px 24px", // Más grande para hacer más prominente
            borderRadius: "12px", // Bordes más suaves
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra suave
            textTransform: "none", // Evitar mayúsculas
            fontWeight: "bold",
            fontSize: "16px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(45deg, #1565c0, #1a73e8)", // Cambiar el gradiente en hover
              boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)", // Mayor sombra en hover
              transform: "scale(1.05)", // Efecto de escala en hover
            },
          }}
        >
          Iniciar Sesión
        </Button>
      </Link>
    </Box>
  ) : (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <DefaultLayout>
          <div>{children}</div>
          <Footer />
        </DefaultLayout>
      </body>
    </html>
  );
}
