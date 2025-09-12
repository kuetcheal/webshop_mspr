// src/api/produitApi.js
import http from "./http";
const BASE = import.meta.env.VITE_API_BASE_URL_PRODUIT?.replace(/\/$/, ""); 

const unwrap = (p) =>
  p.then((r) => r.data).catch((err) => {
    const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Erreur réseau";
    throw new Error(msg);
  });

export const createProduct  = (payload) => unwrap(http.post(`${BASE}/produits`, payload));
export const getProducts    = ()        => unwrap(http.get(`${BASE}/produits`));
export const getProductById = (id)      => unwrap(http.get(`${BASE}/produits/${id}`));
export const updateProduct  = (id, d)   => unwrap(http.put(`${BASE}/produits/${id}`, d));
export const deleteProduct  = (id)      => unwrap(http.delete(`${BASE}/produits/${id}`));

// upload image multipart
export const uploadProductImage = (id, file) => {
  const fd = new FormData();
  fd.append("file", file);
  return http.post(`${BASE}/produits/${id}/image`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// résolveur d’URL d’image
export const resolvePublicUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const origin = BASE.replace(/\/api$/, ""); // http://localhost:8083
  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
};

export default {
  createProduct, getProducts, getProductById, updateProduct, deleteProduct, uploadProductImage, resolvePublicUrl,
};
