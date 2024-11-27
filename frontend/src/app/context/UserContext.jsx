"use client";
import { createContext, use, useState } from "react";
import { useEffect } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const loginUser = async (username, password) => {
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        console.log("hola");
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.error };
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
