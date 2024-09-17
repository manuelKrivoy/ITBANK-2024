import React, { useMemo } from 'react';
import { Container, Typography, Box } from '@mui/material';
import MyCards from '../MyCards/page';
import TransaccionesRecientes from '../TransaccionesRecientes/page';
import ConversorDivisas from '../ConversorDivisas/page';
import PrestamoSimulador from '../PrestamoSimulador/page';

const HomeProfile: React.FC = React.memo(() => {
  const transactions = useMemo(() => [
    { description: 'Depósito desde mi tarjeta', date: '25 Enero 2021', amount: '- $500' },
    { description: 'Depósito Paypal', date: '25 Enero 2021', amount: '+ $500' },
    { description: 'Retiro', date: '25 Enero 2021', amount: '- $500' },
  ], []);

  return (
    <Container sx={{ maxWidth: '100%', overflowX: 'hidden', px: { xs: 2, md: 3 } }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={3}>
        <Box flexBasis={{ xs: '100%', md: '48%' }}>
          <MyCards color="#3f51b5" type="savings" />
        </Box>
        <Box flexBasis={{ xs: '100%', md: '48%' }}>
          <MyCards color="#9e9e9e" type="credit" />
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Simulador de Préstamos
        </Typography>
        <Box sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
          <PrestamoSimulador />
        </Box>
      </Box>
      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          Movimientos
        </Typography>
        <TransaccionesRecientes transactions={transactions} />
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Conversor de divisas
        </Typography>
        <ConversorDivisas />
      </Box>
    </Container>
  );
});

export default HomeProfile;
