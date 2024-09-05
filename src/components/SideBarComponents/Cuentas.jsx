import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ToggleButton, ToggleButtonGroup, Typography, Box, Paper } from "@mui/material";

const Cuentas = () => {
  const { user } = useContext(UserContext);
  const [type, setType] = useState("pesos");

  const handleType = (event, newType) => {
    if (newType !== null) {
      setType(newType);
    }
  };

  const balance = type === "pesos" ? user.saldoPesos : user.saldoDolares;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        marginBottom: 50,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 3,
          borderRadius: 4,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Selecciona tu cuenta
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleType}
          aria-label="Tipo de cuenta"
          sx={{ marginBottom: 3 }}
        >
          <ToggleButton
            value="pesos"
            sx={{
              borderRadius: "16px",
              "&.Mui-selected": {
                backgroundColor: "#42a5f5",
                color: "#fff",
              },
            }}
          >
            ARS
          </ToggleButton>
          <ToggleButton
            value="usd"
            sx={{
              borderRadius: "16px",
              "&.Mui-selected": {
                backgroundColor: "#3aa066",
                color: "#fff",
              },
            }}
          >
            USD
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          Saldo actual:
        </Typography>
        <Typography variant="h4" color="primary">
          {type === "pesos" ? `ARS $${balance}` : `USD $${balance}`}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Cuentas;
