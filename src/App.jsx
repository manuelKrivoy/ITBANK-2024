import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound";
import Index from "./components/pages/Index/Index";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
