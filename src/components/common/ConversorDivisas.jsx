import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Card, CardContent, MenuItem } from '@mui/material';
import { UserContext } from '../../context/UserContext';

const ConversorDivisas = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('ARS');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);
  const { user } = useContext(UserContext);

  const currencies = ['EUR', 'USD', 'BRL', 'UYU', 'CNY', 'ARS'];

  const convertCurrency = async () => {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/1871b26c2559f77b0a6cd4a5/latest/${fromCurrency}`);
      const rate = response.data.conversion_rates[toCurrency];
      setResult(amount * rate);
    } catch (error) {
      console.error('Error fetching the exchange rate', error);
    }
  };

  return (
    <Container>
      <Card sx={{ padding: 3, borderRadius: '12px', backgroundColor: '#f5f5f5', boxShadow: 'none' }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Saldo en dólares: ${user?.saldoDolares || "0.00"}
          </Typography>
          <form onSubmit={(e) => { e.preventDefault(); convertCurrency(); }}>
            <TextField
              label="Monto"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="De"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              fullWidth
              margin="normal"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="A"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              fullWidth
              margin="normal"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#614aff' }} type="submit" fullWidth>
              Convertir
            </Button>
          </form>
          {result && (
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ConversorDivisas;
