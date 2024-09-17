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
  const amount = searchParams.get("amount");
  const recipient = searchParams.get("recipient");

  const handleDownload = () => {
    // Si el archivo está en la carpeta 'public/docs/comprobante.pdf'
    const url = "/docs/plantilla-comprobante.pdf";
    const link = document.createElement("a");
    link.href = url;
    link.download = "comprobante.pdf"; // Nombre del archivo al descargar
    link.click();
  };

  return (
    <DefaultLayout>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Card sx={{ maxWidth: 1000, width: "100%", borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center" color="primary">
              Transferencia Exitosa
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Usamos Flexbox para alinear los elementos */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
              <Typography variant="body1" align="center">
                <strong>ID de Transferencia:</strong> {params.transferId}
              </Typography>
              <Typography variant="body1" align="center">
                <strong>Usuario remitente:</strong> {user.name}
              </Typography>
              <Typography variant="body1" align="center">
                <strong>Usuario destinatario:</strong> {recipient}
              </Typography>
              <Typography variant="body1" align="center">
                <strong>Monto:</strong> {currency} {amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Link href="/profile/transferencias" >
              <Button
                variant="contained"
                color="primary"
          
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  mr:4,
                }}
              >
                Realizar otra transfenrencia
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
    </DefaultLayout>
  );
};

export default TransferPage;
