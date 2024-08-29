import { useState } from "react";
import { Container, TextField, Typography, Link } from "@mui/material";
import { Root, LeftSide, RightSide, FormContainer, Logo, HoverButton } from "./LoginPageStyles";
import Index from "../Index/Index";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Root>
      <LeftSide>
        <Container>
          <FormContainer>
            <Logo src="/logo.svg" alt="Logo" />
            <TextField
              fullWidth
              label={isLogin ? "Correo electrónico" : "Nombre completo"}
              margin="normal"
              variant="outlined"
            />
            {!isLogin && <TextField fullWidth label="Correo electrónico" margin="normal" variant="outlined" />}
            <TextField fullWidth label="Contraseña" type="password" margin="normal" variant="outlined" />
            {!isLogin && (
              <TextField fullWidth label="Confirmar contraseña" type="password" margin="normal" variant="outlined" />
            )}
            {isLogin ? (
              <HoverButton variant="contained" color="primary" fullWidth onClick={<Index></Index>}>
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
