"use client";
import { useContext, useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, Stack, Divider } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import DefaultLayout from "../components/Layouts/DefaultLayout";

const CuentasPage = () => {
  const [pagos, setPagos] = useState([]);
  const { user } = useContext(UserContext);
  const credentials = localStorage.getItem("authCredentials");
  // Función para obtener las deudas del cliente
  const fetchPagos = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/clientes/deudas/", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      const data = await response.json();
      setPagos(data.deudas || []); // Asegúrate de que el campo 'deudas' esté en la respuesta
    } catch (error) {
      console.error("Error al obtener las deudas:", error);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  // Función para manejar el pago de la deuda
  const handleSubmit = (pago) => {
    Swal.fire({
      title: "¿Estás seguro de querer pagar?",
      text: `Vas a pagar ${pago.descripcion} por un valor de $${pago.monto}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        payDeuda(pago.id);
      }
    });
  };

  // Función para realizar el pago de la deuda
  const payDeuda = async (deudaId) => {
    try {
      const credentials = localStorage.getItem("authCredentials");
      const response = await fetch(`http://localhost:8000/api/clientes/pagar-deuda/${deudaId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${credentials}`, // Asegúrate de enviar el token de autorización
        },
      });

      if (response.ok) {
        // Si la deuda se pagó correctamente, elimina el pago de la lista
        setPagos(pagos.filter((p) => p.id !== deudaId));
        Swal.fire({
          title: "¡Pago realizado!",
          text: "El pago fue realizado con éxito.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al procesar el pago.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error al realizar el pago:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al realizar el pago.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return pagos.length === 0 ? (
    <Typography variant="h4" component="div" sx={{ textAlign: "center", marginTop: 5 }}>
      No hay pagos pendientes
    </Typography>
  ) : (
    <Box sx={{ padding: 2 }}>
      <Stack spacing={3}>
        {pagos.map((pago, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center">
                <PaymentIcon color="primary" />
                <Typography variant="h5" component="div">
                  {pago.descripcion}
                </Typography>
              </Stack>
              <Divider sx={{ marginY: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 25 }}>
                <b>${pago.monto}</b>
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  background: "linear-gradient(45deg, #1e88e5 30%, #42a5f5 90%)",
                  transition: "background 0.3s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(45deg, #42a5f5 30%, #1e88e5 90%)",
                  },
                }}
                onClick={() => handleSubmit(pago)}
              >
                Pagar
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default CuentasPage;
