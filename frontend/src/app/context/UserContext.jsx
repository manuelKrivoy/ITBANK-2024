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
      // Codificar las credenciales en base64
      const credentials = btoa(`${username}:${password}`);

      const response = await fetch("http://localhost:8000/api/login/", {
        method: "GET", // Usar GET o el método apropiado según tu API
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();

        // Guardar las credenciales de usuario en localStorage (si deseas persistir la sesión)
        localStorage.setItem("user", JSON.stringify(userData)); // Guardamos los datos del usuario
        localStorage.setItem("authCredentials", credentials); // Guardamos las credenciales codificadas (opcional)

        setUser(userData); // Almacenar el usuario en el contexto

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
    setUser(null); // Limpiar el estado del usuario
    localStorage.removeItem("user"); // Eliminar los datos del usuario de localStorage
    localStorage.removeItem("authCredentials"); // Eliminar las credenciales de localStorage
  };

  return <UserContext.Provider value={{ user, loginUser, logoutUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
