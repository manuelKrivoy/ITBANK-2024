import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedLoginRoute = ({ element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      return navigate("/profile");
    }
  }, []);

  return element;
};

export default ProtectedLoginRoute;
