// src/api/clientApi.js
import http from "./http";

const BASE = import.meta.env.VITE_API_BASE_URL_CLIENT?.replace(/\/$/, ""); // ex: http://localhost:8074/api

const unwrap = (p) =>
  p.then((r) => r.data).catch((err) => {
    const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Erreur réseau";
    throw new Error(msg);
  });

export const createClient   = (payload) => unwrap(http.post(`${BASE}/clients`, payload));
export const getClients     = ()        => unwrap(http.get(`${BASE}/clients`));
export const getClientById  = (id)      => unwrap(http.get(`${BASE}/clients/${id}`));
export const updateClient   = (id, d)   => unwrap(http.put(`${BASE}/clients/${id}`, d));
export const deleteClient   = (id)      => unwrap(http.delete(`${BASE}/clients/${id}`));

export default { createClient, getClients, getClientById, updateClient, deleteClient };
