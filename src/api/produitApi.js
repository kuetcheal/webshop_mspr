// src/api/produitApi.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_PRODUIT, // ex: http://localhost:8080/api
  headers: { "Content-Type": "application/json" },
});

// Si tu utilises le JWT plus tard:
// api.interceptors.request.use(cfg => {
//   const token = localStorage.getItem("token");
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;
//   return cfg;
// });

export const createProduct  = (payload)     => api.post("/produits", payload);
export const getProducts    = ()            => api.get("/produits");
export const getProductById = (id)          => api.get(`/produits/${id}`);
export const updateProduct  = (id, payload) => api.put(`/produits/${id}`, payload);
export const deleteProduct  = (id)          => api.delete(`/produits/${id}`);

export default { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
