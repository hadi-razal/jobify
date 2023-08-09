import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Attempt to retrieve auth data from local storage
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
    return {
      name: "",
      userId: "",
      role: "",
      email: "",
      token: "",
    };
  });

  // Set Axios default headers when auth changes
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth]);

  const clear = () => {
    // Clear auth and remove from local storage
    setAuth({
      name: "",
      userId: "",
      role: "",
      email: "",
      token: "",
    });
    localStorage.removeItem("auth");
  };

  const logOut = () => {
    clear();
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
