// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin } from "@/api/authApi";
import { clearAccessToken } from "@/api/http";

const AuthCtx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    if (t !== token) setToken(t);
  }, []);

  const login = async (u, p) => {
    const { accessToken } = await apiLogin(u, p);
    setToken(accessToken);
  };

  const logout = () => {
    clearAccessToken();
    setToken(null);
    window.location.href = "/login";
  };

  return <AuthCtx.Provider value={{ token, isAuth: !!token, login, logout }}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);
