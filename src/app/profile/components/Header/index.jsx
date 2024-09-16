import React from "react";
import Link from "next/link";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detecta si es un dispositivo móvil

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E0E0E0" }}
    >
      <Toolbar sx={{ minHeight: { xs: "80px", lg: "80px" } }}>
        {isMobile && ( // Solo muestra el ícono en dispositivos móviles
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon />
          </IconButton>
        )}
        {isMobile && ( // Solo muestra el logo en dispositivos móviles
          <Link href="/profile" passHref>
            <Button color="inherit">
              <Image
                width={40}
                height={40}
                src="/logo/logo-icon.svg"
                alt="Logo"
              />
            </Button>
          </Link>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <DropdownUser />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
