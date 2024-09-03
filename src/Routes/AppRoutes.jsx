import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "../components/pages/Login/Login";
import Home from "../components/pages/Home/Home";
import NotFound from "../components/pages/NotFound";

// Perfil de usuario:
import Index from "../components/pages/Index/Index";
import HomeProfile from "../components/common/HomeProfile";
import Cuentas from "../components/common/Cuentas";
import { UserContext } from "../context/UserContext";

//Rutas privadas
import ProtectedProfileRoute from "../Routes/ProtectedProfileRoute";
import Transferencias from "../components/common/Transferencias";
import Pagos from "../components/common/Pagos";
import Inversiones from "../components/common/Inversiones";

function AppRoutes() {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
      <Route path="/profile" element={<ProtectedProfileRoute element={<Index component={<HomeProfile />} />} />} />
      <Route path="/profile/cuentas" element={<ProtectedProfileRoute element={<Index component={<Cuentas />} />} />} />
      <Route
        path="/profile/transferencias"
        element={<ProtectedProfileRoute element={<Index component={<Transferencias />} />} />}
      />
      <Route path="/profile/pagos" element={<ProtectedProfileRoute element={<Index component={<Pagos />} />} />} />
      <Route
        path="/profile/inversiones"
        element={<ProtectedProfileRoute element={<Index component={<Inversiones />} />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
