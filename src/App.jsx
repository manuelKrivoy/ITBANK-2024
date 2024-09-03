import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Footer from "./components/layout/Footer";

import AppRoutes from "./Routes/AppRoutes";
function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes></AppRoutes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
