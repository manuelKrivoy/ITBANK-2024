import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MyCards from '../MyCards/page';
import TransaccionesRecientes from '../TransaccionesRecientes/page';

const HomeProfile: React.FC = () => {
  const transactions = [
    { description: 'Depósito desde mi tarjeta', date: '25 Enero 2021', amount: '- $500' },
    { description: 'Depósito Paypal', date: '25 Enero 2021', amount: '+ $500' },
    { description: 'Retiro', date: '25 Enero 2021', amount: '- $500' },
  ];

  return (
    
    <Container className="container" sx={{ maxWidth: '100%', overflowX: 'hidden', paddingX: { xs: 2, md: 3 } }}>
      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          Movimientos
        </Typography>
        <TransaccionesRecientes transactions={transactions} />
      </Box>
    </Container>
  );
};

export default HomeProfile;
