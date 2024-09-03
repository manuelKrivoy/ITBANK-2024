import React, { useContext } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import MyCards from "./MyCards";
import { UserContext } from "../../context/UserContext";

const HomeProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, <span style={{ color: "#3f51b5" }}>{user?.name || "Usuario"}</span>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MyCards color="#3f51b5" type="savings" />
          </Grid>
          <Grid item xs={12} md={6}>
            <MyCards color="#9e9e9e" type="credit" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomeProfile;
