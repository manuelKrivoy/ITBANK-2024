import React, { useContext, useState } from "react";
import { Card, CardContent, Typography, Button, Box, Stack, Divider } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";

const Pagos = () => {
  const { modifyCurrencyAmount } = useContext(UserContext);
  const [pagos, setPagos] = useState([
    {
      title: "Factura de luz",
      valor: 1050,
    },
    {
      title: "Cargar SUBE",
      valor: 130,
    },
    {
      title: "Monotributo",
      valor: 1111,
    },
  ]);

  const handleSubmit = (pago) => {
    Swal.fire({
      title: "¿Estás seguro de querer pagar?",
      text: `Vas a pagar ${pago.title} por un valor de $${pago.valor}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, pagar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        modifyCurrencyAmount("$", pago.valor);
        setPagos(pagos.filter((p) => p.title !== pago.title));
        Swal.fire("¡Pago realizado!", "El pago fue realizado con éxito", "success");
      }
    });
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
                  {pago.title}
                </Typography>
              </Stack>
              <Divider sx={{ marginY: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 25 }}>
                <b>${pago.valor}</b>
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

export default Pagos;
