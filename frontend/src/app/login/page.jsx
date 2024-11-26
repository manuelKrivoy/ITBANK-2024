"use client";
import { useContext, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress"; // Spinner de MUI
import { Root, LeftSide, RightSide, FormContainer, Logo, HoverButton } from "./LoginStyles";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";

//Sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Page = () => {
  const { loginUser, logoutUser, user } = useContext(UserContext);
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    logoutUser();
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLogIn = async () => {
    setIsLoading(true);
    const result = await loginUser(formData.username, formData.password);
    if (result.success) {
      MySwal.fire({
        title: "Bienvenido",
        text: "Inicio de sesión exitoso",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4caf50",
      });
      router.push("/profile");
    } else {
      MySwal.fire({
        title: "Error",
        text: result.message || "No se pudo iniciar sesión",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#f50057",
      });
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        MySwal.fire({
          title: "Éxito",
          text: "Usuario registrado correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#4caf50",
        });
        setIsLogin(true); // Cambiar al formulario de inicio de sesión
      } else {
        MySwal.fire({
          title: "Error",
          text: data.error || "No se pudo registrar el usuario",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#f50057",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: "Ocurrió un problema con la solicitud",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#f50057",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Root>
      <LeftSide>
        <Container>
          <FormContainer>
            {isLoading ? (
              <div>
                <CircularProgress color="secondary" />
                <p>Cargando...</p>
              </div>
            ) : (
              <>
                <Logo src="/logo.svg" alt="Logo" />
                {!isLogin && (
                  <>
                    <TextField
                      id="username"
                      fullWidth
                      label="Nombre de usuario"
                      type="text"
                      margin="normal"
                      variant="outlined"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="nombre"
                      fullWidth
                      label="Nombre"
                      type="text"
                      margin="normal"
                      variant="outlined"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="apellido"
                      fullWidth
                      label="Apellido"
                      type="text"
                      margin="normal"
                      variant="outlined"
                      value={formData.apellido}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="dni"
                      fullWidth
                      label="DNI"
                      type="number"
                      margin="normal"
                      variant="outlined"
                      value={formData.dni}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="fecha_nacimiento"
                      fullWidth
                      label="Fecha de nacimiento"
                      type="date"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={formData.fecha_nacimiento}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                <TextField
                  id="username"
                  fullWidth
                  label="Nombre de usuario"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <TextField
                  id="password"
                  fullWidth
                  label="Contraseña"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleInputChange}
                />

                {isLogin ? (
                  <HoverButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogIn}
                    disabled={!formData.username || !formData.password}
                  >
                    Iniciar Sesión
                  </HoverButton>
                ) : (
                  <HoverButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSignUp}
                    disabled={
                      !formData.username ||
                      !formData.email ||
                      !formData.password ||
                      !formData.nombre ||
                      !formData.apellido ||
                      !formData.dni ||
                      !formData.fecha_nacimiento
                    }
                  >
                    Registrarse
                  </HoverButton>
                )}

                <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
                  {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                  <Link href="#" onClick={toggleForm} style={{ marginLeft: "5px" }}>
                    {isLogin ? "Regístrate" : "Inicia sesión"}
                  </Link>
                </Typography>
              </>
            )}
          </FormContainer>
        </Container>
      </LeftSide>
      <RightSide />
    </Root>
  );
};

export default Page;
