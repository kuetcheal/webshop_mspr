// src/api/authApi.js
import http, { setAccessToken } from "./http";

const AUTH_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, ""); // service CLIENT émet le token

export const login = async (username, password) => {
  const { data } = await http.post(`${AUTH_BASE.replace(/\/api$/, "")}/auth/login`, { username, password });
  // attendu: { accessToken, tokenType, expiresIn }
  setAccessToken(data?.accessToken);
  return data;
};
