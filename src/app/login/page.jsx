"use client";
import { useContext, useState, useEffect } from "react";
import { Container, TextField, Typography, Link } from "@mui/material";
import {
  Root,
  LeftSide,
  RightSide,
  FormContainer,
  Logo,
  HoverButton,
} from "./LoginStyles";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";

//Sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const page = () => {
  const { users, user, loggedUser } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/profile");
    }
  }, []);

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogIn = () => {
    // Obtengo mail y contraseña de los inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    // Verifico que exista
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      loggedUser(user);
      router.push("/profile");
    } else {
      MySwal.fire({
        title: "Error",
        text: "Datos incorrectos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Root>
      <LeftSide>
        <Container>
          <FormContainer>
            <Logo src="/logo.svg" alt="Logo" />
            {!isLogin && (
              <TextField
                id="dni"
                fullWidth
                label="DNI"
                type="number"
                margin="normal"
                variant="outlined"
              />
            )}
            <TextField
              id="email"
              type="email"
              fullWidth
              label={isLogin ? "Correo electrónico" : "Nombre completo"}
              margin="normal"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
            />
            {!isLogin && (
              <TextField
                id="name"
                fullWidth
                label="Correo electrónico"
                margin="normal"
                variant="outlined"
              />
            )}
            <TextField
              id="password"
              fullWidth
              label="Contraseña"
              type="password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
            />

            {isLogin ? (
              <HoverButton
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogIn}
                disabled={!email || !password}
              >
                Iniciar Sesión
              </HoverButton>
            ) : (
              <HoverButton
                variant="contained"
                color="primary"
                fullWidth
                disabled
              >
                Registrarse
              </HoverButton>
            )}

            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "20px" }}
            >
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              <Link href="#" onClick={toggleForm} style={{ marginLeft: "5px" }}>
                {isLogin ? "Regístrate" : "Inicia sesión"}
              </Link>
            </Typography>
          </FormContainer>
        </Container>
      </LeftSide>
      <RightSide />
    </Root>
  );
};

export default page;
