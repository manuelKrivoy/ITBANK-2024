import React from 'react';
import { Typography, List, ListItem, ListItemText, Box, Avatar } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';

const TransaccionesRecientes = ({ transactions }) => {
  return (
    <Box sx={{ borderRadius: '16px', p: 2, bgcolor: 'background.paper' }}>
      <List>
        {transactions.map((transaction, index) => (
          <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: transaction.amount.startsWith('+') ? 'success.main' : 'error.main', mr: 2 }}>
                <ReceiptIcon />
              </Avatar>
              <ListItemText 
                primary={transaction.description} 
                secondary={transaction.date} 
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: transaction.amount.startsWith('+') ? 'success.main' : 'error.main' }}>
              {transaction.amount}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransaccionesRecientes;