import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedProfileRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      console.log("No user found, navigating to /login");
      navigate("/login");
    }
  }, [navigate]);

  return element;
};

export default ProtectedProfileRoute;
