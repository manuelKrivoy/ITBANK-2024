import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound";

// Perfil de usuario:
import Index from "./components/pages/Index/Index";
import HomeProfile from "./components/common/HomeProfile";
import Cuentas from "./components/common/Cuentas";
import Footer from "./components/layout/Footer";
import { UserProvider } from "./context/UserContext";

//Rutas privadas
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute element={<Index component={<HomeProfile />} />} />} />
          <Route path="/profile/cuentas" element={<ProtectedRoute element={<Index component={<Cuentas />} />} />} />
          <Route path="/profile/transferencias" element={<ProtectedRoute element={<Index />} />} />
          <Route path="/profile/pagos" element={<ProtectedRoute element={<Index />} />} />
          <Route path="/profile/inversiones" element={<ProtectedRoute element={<Index />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
