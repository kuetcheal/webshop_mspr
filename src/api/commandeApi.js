// src/api/commandeApi.js
import http from "./http";
import axios from "axios";

const API = (import.meta.env.VITE_API_BASE_URL_COMMANDE || "http://localhost:8084/api").replace(/\/$/, "");
const ORIGIN = API.replace(/\/api$/, ""); // http://localhost:8084

const unwrap = (p) =>
  p.then((r) => r.data).catch((err) => {
    const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Erreur réseau";
    throw new Error(msg);
  });

// /api/orders
export const createOrder  = ({ customerId }) => unwrap(http.post(`${API}/orders`, { customerId: Number(customerId) }));
export const getOrders    = ()               => unwrap(http.get(`${API}/orders`));
export const getOrderById = (id)             => unwrap(http.get(`${API}/orders/${id}`));
export const deleteOrder  = (id)             => unwrap(http.delete(`${API}/orders/${id}`));

// /order-products (hors /api)
export const createOrderProduct = (dto) => axios.post(`${ORIGIN}/order-products`, dto, {
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}` },
});
export const getOrderProducts   = ()        => unwrap(http.get(`${ORIGIN}/order-products`));
export const getOrderProduct    = (id)      => unwrap(http.get(`${ORIGIN}/order-products/${id}`));
export const updateOrderProduct = (id, dto) => unwrap(http.put(`${ORIGIN}/order-products/${id}`, dto));
export const deleteOrderProduct = (id)      => unwrap(http.delete(`${ORIGIN}/order-products/${id}`));

export default {
  createOrder, getOrders, getOrderById, deleteOrder,
  createOrderProduct, getOrderProducts, getOrderProduct, updateOrderProduct, deleteOrderProduct,
};
