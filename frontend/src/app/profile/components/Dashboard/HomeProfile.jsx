import React from "react";
import { Container, Typography, Box } from "@mui/material";
import TransaccionesRecientes from "../TransaccionesRecientes/page";
import MyCards from "../MyCards/page";
import Link from "next/link";

const HomeProfile = React.memo(function HomeProfile() {
  return (
    <Container sx={{ maxWidth: "100%", overflowX: "hidden", px: { xs: 2, md: 3 } }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={3}>
        <Box flexBasis={{ xs: "100%", md: "48%" }}>
          <MyCards type="savings" />
        </Box>
        <Box flexBasis={{ xs: "100%", md: "48%" }}>
          <MyCards type="credit" />
          <Box display="flex" justifyContent="center" mt={2}>
            <Link href="./profile/tarjetas" prefetch={true}>
              <Typography
                sx={{
                  color: "gray",
                  transition: "all 0.1s ease",
                  "&:hover": {
                    color: "black",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Ver todas mis tarjetas ...
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          Movimientos
        </Typography>
        <TransaccionesRecientes />
      </Box>
    </Container>
  );
});

export default HomeProfile;
