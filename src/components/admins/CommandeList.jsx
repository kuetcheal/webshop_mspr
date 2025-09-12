import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getOrders, deleteOrder } from "@/api/commandeApi";

import "./commandeList.css";

export default function CommandeList() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // UI state
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.message || "Impossible de charger les commandes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // filtre + pagination
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return orders;
    return orders.filter((o) => {
      const id = String(o.id ?? "");
      const cust = String(o.customerId ?? "");
      const total = String(o.totalAmount ?? "");
      return id.includes(needle) || cust.includes(needle) || total.includes(needle);
    });
  }, [orders, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, pages);
  const pageSlice = useMemo(() => {
    const start = (pageSafe - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageSafe, pageSize]);

  const fmtDate = (d) => {
    if (!d) return "";
    try {
      return new Date(d).toLocaleString("fr-FR");
    } catch {
      return String(d);
    }
  };

  const fmtMoney = (x) => {
    const n = typeof x === "number" ? x : Number(x);
    return Number.isNaN(n) ? String(x ?? "") : `${n.toFixed(2)} €`;
    // si backend renvoie BigDecimal => string, on l'affiche tel quel
  };

  async function onDelete(id) {
    if (!window.confirm("Supprimer définitivement cette commande ?")) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (e) {
      alert(e?.message || "Échec de la suppression.");
    }
  }

  function onEdit(id) {
    // Crée plus tard /CommandeEdit/:id si besoin
    navigate(`/CommandeEdit/${id}`);
  }

  return (
    <div className="commande-page">
      <div className="commande-container">
        <h2 className="cmd-title">Liste des commandes</h2>

        <div className="cmd-toolbar">
          <div className="cmd-search">
            <SearchIcon className="cmd-search__icon" />
            <input
              className="cmd-search__input"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Rechercher par id / client / total…"
            />
          </div>

          <button className="btn btn--light" onClick={load} title="Actualiser">
            <RefreshIcon fontSize="small" />
            <span>Actualiser</span>
          </button>

          <div className="cmd-pagesize">
            <label>Afficher</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span>lignes</span>
          </div>
        </div>

        <div className="cmd-tableCard">
          <table className="cmd-table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Client</th>
                <th>Date</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="cmd-tdCentered">
                    Chargement…
                  </td>
                </tr>
              ) : err ? (
                <tr>
                  <td colSpan={5} className="cmd-tdCentered cmd-error">
                    {err}
                  </td>
                </tr>
              ) : pageSlice.length === 0 ? (
                <tr>
                  <td colSpan={5} className="cmd-tdCentered">
                    Aucune commande.
                  </td>
                </tr>
              ) : (
                pageSlice.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>#{o.customerId}</td>
                    <td>{fmtDate(o.createdAt)}</td>
                    <td>{fmtMoney(o.totalAmount)}</td>
                    <td>
                      <div className="cmd-actions">
                        <button className="btn btn--light" onClick={() => onEdit(o.id)} title="Modifier">
                          <EditIcon fontSize="small" />
                          <span>Modifier</span>
                        </button>
                        <button
                          className="btn btn--danger"
                          onClick={() => onDelete(o.id)}
                          title="Supprimer"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="cmd-pagination">
          <button
            className="btn btn--light"
            disabled={pageSafe <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ◀ Précédent
          </button>
          <span className="cmd-pageinfo">
            Page {pageSafe} / {pages}
          </span>
          <button
            className="btn btn--light"
            disabled={pageSafe >= pages}
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
          >
            Suivant ▶
          </button>
        </div>
      </div>
    </div>
  );
}
