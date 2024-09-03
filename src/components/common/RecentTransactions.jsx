// src/components/RecentTransactions.jsx
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';

const RecentTransactions = ({ transactions }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          <ReceiptIcon sx={{ marginRight: 1 }} />
          <Typography variant="h5">Recent Transactions</Typography>
        </Box>
        <List>
          {transactions.map((transaction, index) => (
            <ListItem key={index}>
              <ListItemText primary={transaction.description} secondary={`${transaction.date} ${transaction.amount}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

<Box my={4}>
<Typography variant="h4" gutterBottom>
  Recent Transactions
</Typography>
<RecentTransactions transactions={transactions} />
</Box>

export default RecentTransactions;
