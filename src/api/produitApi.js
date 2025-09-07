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

export const createProduct   = (payload)            => api.post("/produits", payload);
export const getProducts     = ()                   => api.get("/produits");
export const getProductById  = (id)                 => api.get(`/produits/${id}`);
export const updateProduct   = (id, payload)        => api.put(`/produits/${id}`, payload);
export const deleteProduct   = (id)                 => api.delete(`/produits/${id}`);

// Upload image (multipart) – backend mettra à jour imageUrl avec /uploads/xxx
export const uploadProductImage = (id, file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api.post(`/produits/${id}/image`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/** Résout une URL publique :
 * - si path est déjà absolu (http/https), on le renvoie tel quel
 * - si path est relatif (/uploads/xxx), on préfixe avec l’origine du backend
 */
export const resolvePublicUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = api.defaults.baseURL?.replace(/\/api\/?$/, "") || "";
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  resolvePublicUrl,
};
