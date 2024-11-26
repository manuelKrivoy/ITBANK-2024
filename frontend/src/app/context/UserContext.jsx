"use client";

import { createContext, useState, useEffect } from "react";
import useSWR from "swr";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginUser = async (user, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (response.status === 200) {
        const userData = await response.json();
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
