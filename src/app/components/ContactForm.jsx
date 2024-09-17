import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Image from 'next/image';

const ContactForm = () => {
  return (
    <Box
      component="form"
      action="https://formspree.io/f/mdknvrnw"
      method="POST"
      sx={{
        maxWidth: 600,
        mt: 6,
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="body1" align="center" gutterBottom>
      <Image
              width={190}
              height={48}
              src={"/logo/logo.svg"}
              alt="Logo"
              priority
            />
      </Typography>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Contáctanos
      </Typography>

      <Box mb={3}>
        <TextField
          fullWidth
          label="Tu correo electrónico"
          type="email"
          name="email"
          id="email"
          required
          variant="outlined"
          margin="normal"
        />
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          label="Nombre Completo"
          id="name"
          required
          variant="outlined"
          margin="normal"
        />
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          label="Tu mensaje"
          name="message"
          id="message"
          multiline
          rows={4}
          required
          variant="outlined"
          margin="normal"
        />
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 1,
            textTransform: 'none',
          }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
