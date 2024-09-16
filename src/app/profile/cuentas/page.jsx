import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DefaultLayout from "../components/Layouts/DefaultLayout";

export const metadata = {
  title: "Sección Cuentas",
  description: "Esta es la sección de cuentas",
};

const CuentasPage = () => {
  return (
    <DefaultLayout>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Esta es la sección cuentas
        </Typography>
      </Container>
    </DefaultLayout>
  );
};

export default CuentasPage;
