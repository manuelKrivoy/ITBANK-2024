import { useContext, useState } from "react";
import { Container, TextField, Typography, Link } from "@mui/material";
import { Root, LeftSide, RightSide, FormContainer, Logo, HoverButton } from "./LoginStyles";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

//Sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const { users, loggedUser } = useContext(UserContext);
  const handleLogIn = () => {
    // Obtengo mail y contraseña de los inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    // Verifico que exista
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      loggedUser(user);
      navigate("/profile");
    } else {
      MySwal.fire({
        title: "Error",
        text: "Datos incorrectos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Root>
      <LeftSide>
        <Container>
          <FormContainer>
            <Logo src="/logo.svg" alt="Logo" />
            {!isLogin && <TextField id="dni" fullWidth label="DNI" type="number" margin="normal" variant="outlined" />}
            <TextField
              id="email"
              fullWidth
              label={isLogin ? "Correo electrónico" : "Nombre completo"}
              margin="normal"
              variant="outlined"
            />
            {!isLogin && (
              <TextField id="name" fullWidth label="Correo electrónico" margin="normal" variant="outlined" />
            )}
            <TextField id="password" fullWidth label="Contraseña" type="password" margin="normal" variant="outlined" />

            {isLogin ? (
              <HoverButton variant="contained" color="primary" fullWidth onClick={handleLogIn}>
                Iniciar Sesión
              </HoverButton>
            ) : (
              <HoverButton variant="contained" color="primary" fullWidth>
                Registrarse
              </HoverButton>
            )}

            <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
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

export default Login;
