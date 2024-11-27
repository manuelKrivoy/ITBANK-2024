"use client";
import { Typography, List, ListItem, ListItemText, Box, Avatar } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useEffect, useState } from "react";

const TransaccionesRecientes = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const credetenials = localStorage.getItem("authCredentials");
      const response = await fetch("http://localhost:8000/api/clientes/mis-transferencias/", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credetenials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Manejar errores de respuesta HTTP
      }

      const data = await response.json();
      setTransactions(data.transferencias || []); // Maneja un posible valor nulo o indefinido en `data.transferencias`
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Box sx={{ borderRadius: "16px", p: 2, bgcolor: "background.paper" }}>
      <List>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: transaction.amount?.startsWith("+") ? "success.main" : "error.main",
                    mr: 2,
                  }}
                >
                  <ReceiptIcon />
                </Avatar>
                <ListItemText
                  primary={transaction.description || "Sin descripción"}
                  secondary={transaction.date || "Fecha no disponible"}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: transaction.amount?.startsWith("+") ? "success.main" : "error.main",
                }}
              >
                {transaction.amount || "N/A"}
              </Typography>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" textAlign="center">
            No se encontraron transacciones recientes.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default TransaccionesRecientes;
