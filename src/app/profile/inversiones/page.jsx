import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import DefaultLayout from "../components/Layouts/DefaultLayout";
import PrestamoSimulador from '../components/PrestamoSimulador/page';
import ConversorDivisas from '../components/ConversorDivisas/page';
const CuentasPage = () => {
  return (
    <DefaultLayout>
            <Box mt={4}>
        <Typography variant="h5" gutterBottom textAlign="center">
          <b>Simulador de Préstamos</b> 
        </Typography>
        <Box sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
          <PrestamoSimulador />
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom textAlign="center">
         <b>Conversor de divisas</b> 
        </Typography>
        <ConversorDivisas />
      </Box>
    </DefaultLayout>
  );
};

export default CuentasPage;
