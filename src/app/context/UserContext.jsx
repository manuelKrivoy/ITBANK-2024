"use client";

import { createContext, useState, useEffect } from "react";
import useSWR from "swr";

const UserContext = createContext();

// Función para fetch de datos
const fetcher = (url) => fetch(url).then((res) => res.json());

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Uso de SWR para fetchear los usuarios
  const { data: users, error } = useSWR("/users.json", fetcher);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const modifyCurrencyAmount = (currency, amount) => {
    if (currency === "USD") {
      setUser({ ...user, saldoDolares: user.saldoDolares - amount });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, saldoDolares: user.saldoDolares - amount }),
      );
    } else {
      setUser({ ...user, saldoPesos: user.saldoPesos - amount });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, saldoPesos: user.saldoPesos - amount }),
      );
    }
  };

  const loggedUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const userLogOut = () => {
    setUser({});
    localStorage.removeItem("user");
  };

  // Manejo de errores en el fetch
  if (error) {
    console.error("Error fetcheando json:", error);
  }
  if (!users) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <UserContext.Provider
      value={{ user, users, userLogOut, loggedUser, modifyCurrencyAmount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
