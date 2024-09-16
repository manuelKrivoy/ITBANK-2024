"use client";
import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    getListOfUsers();
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

  const getListOfUsers = async () => {
    try {
      const response = await fetch("/users.json");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetcheando json:", error);
    }
  };

  const userLogOut = () => {
    setUser({});
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, users, userLogOut, loggedUser, modifyCurrencyAmount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
