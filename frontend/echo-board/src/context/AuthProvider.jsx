import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import API from "../api/axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const login = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  setUser(data.user);
  return data.user;
};

  const signup = async (username, email, password) => {
    const { data } = await API.post("/auth/signup", {
      username,
      email,
      password
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

 const checkAuth = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const { data } = await API.get("/auth/me");
    setUser(data.user);
  } catch (error) {
    localStorage.removeItem("token");
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;