import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound";

// Perfil de usuario:
import Index from "./components/pages/Index/Index";
import HomeProfile from "./components/common/HomeProfile";
import Cuentas from "./components/common/Cuentas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Index component={<HomeProfile />} />} />
        <Route path="/profile/cuentas" element={<Index component={<Cuentas />} />} />
        <Route path="/profile/transferencias" element={<Index />} />
        <Route path="/profile/pagos" element={<Index />} />
        <Route path="/profile/inversiones" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
