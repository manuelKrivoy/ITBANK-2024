"use client";
import React, { useContext } from "react";
import { Box, Card, CardContent, Typography, Button, Divider } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useSearchParams, useParams } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Link from "next/link";
const TransferPage = () => {
  const { user } = useContext(UserContext);
  const searchParams = useSearchParams();
  const params = useParams();

  // Acceder a los parámetros de la URL
  const currency = searchParams.get("currency");
  const amount = searchParams.get("monto");
  const recipient = searchParams.get("clienteReceptor");
  const emisor = searchParams.get("clienteEmisor");

  const handleDownload = () => {
    // Si el archivo está en la carpeta 'public/docs/comprobante.pdf'
    const url = "/docs/plantilla-comprobante.pdf";
    const link = document.createElement("a");
    link.href = url;
    link.download = "comprobante.pdf"; // Nombre del archivo al descargar
    link.click();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
      <Card
        sx={{
          width: {
            xs: "90%",
            sm: "70%",
            md: "60%",
            lg: "50%",
          },
          borderRadius: 4,
          boxShadow: 3,
          padding: { xs: 2, sm: 3 },
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            Transferencia Exitosa
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="body1">
              <strong>ID de Transferencia:</strong> {params.transferId}
            </Typography>
            <Typography variant="body1">
              <strong>Usuario remitente:</strong> {emisor}
            </Typography>
            <Typography variant="body1">
              <strong>Usuario destinatario:</strong> {recipient}
            </Typography>
            <Typography variant="body1">
              <strong>Monto:</strong> $ {currency} {amount}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: 3,
            }}
          >
            <Link href="/profile/transferencias">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                }}
              >
                Realizar otra transferencia
              </Button>
            </Link>

            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                background: "linear-gradient(45deg, #2b43a4 30%, #48599f 90%)",
                transition: "background 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(45deg, #48599f 30%, #2b43a4 90%)",
                },
              }}
              onClick={handleDownload}
            >
              Descargar comprobante
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransferPage;
