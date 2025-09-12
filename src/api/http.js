// src/api/http.js
import axios from "axios";

const http = axios.create({
  headers: { "Content-Type": "application/json" },
});

// helpers pratiques
export const setAccessToken = (token) => {
  if (token) localStorage.setItem("accessToken", token);
};
export const clearAccessToken = () => localStorage.removeItem("accessToken");

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAccessToken();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default http;
