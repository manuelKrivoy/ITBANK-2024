import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsername = localStorage.getItem("user");
    if (savedUsername) {
      setUser(user);
    }
    getListOfUsers();
  }, []);

  const getListOfUsers = async () => {
    try {
      const response = await fetch("/users.json");

      const data = await response.json();
      setUsers(data);
      console.log(users);
    } catch (error) {
      console.error("Error fetcheando json:", error);
    }
  };

  const userLogOut = () => {
    setUser({});
  };

  return <UserContext.Provider value={{ user, users, userLogOut }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
