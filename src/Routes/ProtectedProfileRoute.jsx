import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return navigate("/login");
    }
  }, []);

  return element;
};

export default ProtectedRoute;
