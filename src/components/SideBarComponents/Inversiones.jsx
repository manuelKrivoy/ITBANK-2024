import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Swal from "sweetalert2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CallMadeIcon from "@mui/icons-material/CallMade";

const showSwalInversion = () => {
  Swal.fire({
    title: " SBS Balanceado ",
    text: ` Capital en fondo: $6.384,80 `,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Invertir",
    cancelButtonText: "Cancelar",
  });
};

const Inversiones = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={3}>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "60vw",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <CardContent sx={{ padding: "20px" }}>
            <Typography variant="h4" align="center">
              Dólares
            </Typography>
            <Typography variant="h6">U$D ... </Typography>
            <Divider sx={{ marginY: 1 }} />
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Comprar" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <CallMadeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Vender" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <SyncAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transferir" />
                </ListItemButton>
              </ListItem>
            </List>
            <Stack direction="row" spacing={6}>
              <box variant="div">
                <Typography variant="h6">Dolar MEP </Typography>
                <Button>COMPRAR</Button>
                <Typography variant="h6">Dolar ahorro </Typography>
                <Button>COMPRAR</Button>
              </box>
            </Stack>
            <Divider sx={{ marginY: 1 }} />
            <Stack>
              <Typography variant="h6">Actividad</Typography>
              <List>
                <ListItem>deposito de mi tarjet - 25 de enero de 2021 - U$D 250</ListItem>
                <ListItem>deposito de mi tarjet - 20 de febrero de 2021 - U$D 500</ListItem>
                <ListItem>deposito de mi tarjet - 15 de abril de 2020 - U$D 100</ListItem>
              </List>
            </Stack>
          </CardContent>
        </Card>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "60vw",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <CardContent sx={{ padding: "20px" }}>
            <Typography variant="h4" align="center">
              Fondos de inversión
            </Typography>
            <Typography variant="h6">invertido $ ... </Typography>
            <Button>Invertir</Button>
            <Divider sx={{ marginY: 1 }} />
            <box variant="div">
              <Typography variant="h6">mis fondos: </Typography>
              <List>
                <ListItem>
                  <Button onClick={showSwalInversion}>Acciones AR</Button>
                </ListItem>
                <ListItem>
                  <Button onClick={showSwalInversion}>Renta fija</Button>
                </ListItem>
                <ListItem>
                  <Button onClick={showSwalInversion}>SBS Balanceado</Button>
                </ListItem>
              </List>
            </box>
          </CardContent>
        </Card>

        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "60vw",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          s
        >
          <CardContent sx={{ padding: "20px" }}>
            <box variant="div">
              <Typography variant="h4">Plazo fijo</Typography>
              <Typography variant="body2">Generá rendidimientos con un plazo fijo</Typography>
              <Button>Simular</Button>
            </box>
            <Divider sx={{ marginY: 1 }} />
            <box variant="div">
              <Typography variant="h4">Plazo fijo UVA</Typography>
              <Typography variant="body2">Generá rendidimientos con un plazo fijo UVA</Typography>
              <Button>Simular</Button>
            </box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Inversiones;
