import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: { "Content-Type": "application/json" },
});

// CRUD
export const createClient   = (payload)           => api.post("/clients", payload);
export const getClients     = ()                  => api.get("/clients");
export const getClientById  = (id)                => api.get(`/clients/${id}`);
export const updateClient   = (id, payload)       => api.put(`/clients/${id}`, payload);
export const deleteClient   = (id)                => api.delete(`/clients/${id}`);

export default { createClient, getClients, getClientById, updateClient, deleteClient };
