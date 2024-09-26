"use client";
import { Container, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { keyframes } from "@mui/system";
import Link from "next/link";
const NotFoundPage = () => {
  // Definimos la animación para el icono
  const iconAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  `;

  // Estilo para el botón con hover effect
  const buttonStyle = {
    background: "linear-gradient(45deg, #19415c, #367cab)",
    color: "#fff",
    marginTop: "20px",
    "&:hover": {
      transform: "rotate(5deg) scale(1.05)",
    },
    transition: "all 0.3s ease-in-out",
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        textAlign: "center",
        marginTop: "100px",
        backgroundColor: "#1f303b",
        borderRadius: "8px",
        padding: "40px",
        marginBottom: "300px",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <ErrorOutlineIcon
          sx={{
            fontSize: 80,
            color: "#f50057",
            animation: `${iconAnimation} 2s infinite`, // Aplicamos la animación al icono
          }}
        />
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: 60, fontWeight: "bold", color: "#fff", animation: `${iconAnimation} 2s infinite` }}
        >
          404
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom style={{ color: "#bbb" }}>
          Oops! La página que buscas no existe.
        </Typography>
        <Link href="/">
          <Button variant="contained" sx={buttonStyle}>
            Volver atrás
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
