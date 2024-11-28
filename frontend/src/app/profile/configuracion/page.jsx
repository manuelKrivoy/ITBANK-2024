"use client";

import React, { useState, useEffect, useContext } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { UserContext } from "@/app/context/UserContext";

const UserProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [userEdit, setUserEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Sincronizar userEdit con user al cargar el componente
  useEffect(() => {
    if (user) {
      setUserEdit({
        nombre: user.cliente.nombre || "",
        apellido: user.cliente.apellido || "",
        email: user.email || "",
        dni: user.cliente.dni || "",
      });
    }
  }, [user]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEdit((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      const authCredentials = localStorage.getItem("authCredentials");
      if (!authCredentials) {
        throw new Error("No se encontraron credenciales de autenticación.");
      }

      // Hacer el PATCH con solo los datos editados
      const response = await fetch(`http://localhost:8000/api/clientes/${user.cliente.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authCredentials}`,
        },
        body: JSON.stringify(userEdit),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const updatedCliente = await response.json();

      const updatedUser = {
        ...user,
        cliente: { ...user.cliente, ...updatedCliente }, // Actualizar solo los campos del cliente
      };
      setIsEditing(false);
      alert("Datos actualizados con éxito. Vuelve a iniciar sesión para ver los cambios");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Hubo un problema al guardar los datos.");
    }
  };

  if (!userEdit) return <Typography>Cargando...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Datos personales
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField label="DNI" name="dni" value={userEdit.dni} disabled fullWidth margin="normal" />
        <TextField
          label="Nombre"
          name="nombre"
          value={userEdit.nombre}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={userEdit.apellido}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userEdit.email}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          {isEditing ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
