import { useState } from "react";
import Link from "next/link";
import ClickOutside from "../ClickOutside";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuItem, Typography, Avatar, IconButton, Box, Divider } from "@mui/material";
import { UserContext } from "@/app/context/UserContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DropdownUser = () => {
  const router = useRouter();
  const { user, logOutUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const dropdownOpen = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logOutUser;
    router.push("/login");
  };

  const handleSettings = () => {
    router.push("/profile/configuracion");
  };
  const profilePicture = user?.cliente.foto;
  return (
    <ClickOutside onClick={handleClose} className="relative">
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={handleAvatarClick}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              overflow: "hidden",
              mx: "auto",
            }}
          >
            <img
              alt={user?.cliente.nombre}
              src={profilePicture}
              width="100"
              height="100"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={dropdownOpen}
        onClose={handleClose}
        sx={{ width: "350px", boxShadow: "none", mt: 1, borderRadius: 2 }}
      >
        <Box px={2} py={2} textAlign="center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              overflow: "hidden",
              mx: "auto",
            }}
          >
            <img
              alt={user?.cliente.nombre}
              src={profilePicture}
              width="100"
              height="100"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Typography variant="h6" mt={1}>
            {user?.cliente.nombre} {user?.cliente.apellido}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Cliente: {user?.cliente.tipo}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleSettings}>
          <PersonIcon />
          <Typography variant="body2" ml={2}>
            Mi Perfil
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <LogoutIcon />
          <Typography variant="body2" ml={2}>
            Salir
          </Typography>
        </MenuItem>
      </Menu>
    </ClickOutside>
  );
};

export default DropdownUser;
