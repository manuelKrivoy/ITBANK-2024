import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const Root = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  margin: 0,
  padding: 0,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const LeftSide = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  [theme.breakpoints.down("md")]: {
    backgroundImage: "url(/login-image.jpg)",
  },
}));

export const RightSide = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundImage: "url(/login-image.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "block",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const FormContainer = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
  backgroundColor: "#fff",
  [theme.breakpoints.down("md")]: {
    maxWidth: "300px",
    margin: "auto",
  },
}));

export const Logo = styled("img")({
  width: "200px",
  marginBottom: "20px",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  "&:hover": {
    transform: "rotate(4deg) scale(1.05)",
    opacity: 0.8,
  },
});

export const HoverButton = styled(Button)({
  marginTop: "20px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});
