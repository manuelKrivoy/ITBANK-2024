import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Swal from "sweetalert2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CallMadeIcon from "@mui/icons-material/CallMade";
import DefaultLayout from "../components/Layouts/DefaultLayout";

const CuentasPage = () => {
  return (
    <DefaultLayout>
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
                    <Button>Acciones AR</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Renta fija</Button>
                  </ListItem>
                  <ListItem>
                    <Button>SBS Balanceado</Button>
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
    </DefaultLayout>
  );
};

export default CuentasPage;