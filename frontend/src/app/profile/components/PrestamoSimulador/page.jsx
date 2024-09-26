"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, Typography, Box, Slider, TextField, Button, Paper } from '@mui/material';

const PrestamoSimulador = () => {
  const [amount, setAmount] = useState(500000);
  const [term, setTerm] = useState(12);

  const handleAmountChange = useCallback((_, newValue) => setAmount(newValue), []);
  const handleAmountInputChange = useCallback((event) => setAmount(Number(event.target.value) || 0), []);
  const handleTermChange = useCallback((newTerm) => setTerm(newTerm), []);

  const terms = [12, 24, 36, 48, 60, 72];

  return (
    <Card sx={{ padding: 3, borderRadius: '12px', backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">Monto a solicitar</Typography>
          <TextField
            value={amount}
            onChange={handleAmountInputChange}
            inputProps={{ min: 50000, max: 1000000, step: 50000 }}
            type="number"
            label="Monto a solicitar"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <Slider
            value={amount}
            onChange={handleAmountChange}
            aria-labelledby="amount-slider"
            min={50000}
            max={1000000}
            step={50000}
            valueLabelDisplay="auto"
            sx={{ marginTop: 2 }}
          />
        </Box>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">Plazo</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
            {terms.map((termOption) => (
              <Paper
                key={termOption}
                onClick={() => handleTermChange(termOption)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: term === termOption ? 'lightblue' : 'white',
                  textAlign: 'center',
                  padding: 1,
                  flex: '1 1 30%',
                  '&:hover': {
                    backgroundColor: 'lightgray',
                  },
                }}
              >
                {termOption} Meses
              </Paper>
            ))}
          </Box>
        </Box>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">Características de la operación</Typography>
          <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, marginTop: 2 }}>
            <Typography>CUOTA INICIAL ESTIMADA: ${(amount / term).toFixed(2)}</Typography>
            <Typography variant="h4" sx={{ color: '#614aff', fontWeight: 'bold' }}>TASA DE INTERÉS: 84.00% NAV 125.22% EAV</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">Obtené tu préstamo completando el siguiente formulario.</Typography>
          <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#614aff' }}>Mi préstamo</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PrestamoSimulador;