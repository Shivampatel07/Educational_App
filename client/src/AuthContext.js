// AuthContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  useEffect(() => {
    axios.get("/user").then((res) => {
      if (res.data.username) {
        setIsLoggedIn(res.data);
      } else {
        setIsLoggedIn(null);
      }
    });
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
