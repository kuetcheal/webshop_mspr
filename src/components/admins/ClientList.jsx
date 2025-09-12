import { useEffect, useMemo, useState } from "react";
import { getClients, deleteClient, updateClient } from "@/api/clientApi.js";

// MUI
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// Icônes
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./clientList.css";

export default function ClientList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Edition
  const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // (optionnel) recherche rapide
  const [q, setQ] = useState("");

  useEffect(() => {
    getClients()
   .then(list => setRows(Array.isArray(list) ? list : []))
   .catch(err => { console.error(err); setRows([]); })
   .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Confirmer la suppression de ce client ?");
    if (!ok) return;
    try {
      await deleteClient(id);
      setRows(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      console.error(e);
      alert("Suppression impossible.");
    }
  };

  const handleOpenEdit = (client) => {
    setEditForm({
      id: client.id,
      username: client.username || "",
      firstName: client.firstName || "",
      lastName: client.lastName || "",
      postalCode: client.postalCode || "",
      city: client.city || "",
      companyName: client.companyName || "",
      profile: client.profile || "",
    });
    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, ...payload } = editForm;
       const updated = await updateClient(id, payload);
      setRows(prev => prev.map(c => (c.id === id ? updated : c)));
      setOpenEdit(false);
      setEditForm(null);
    } catch (e) {
      console.error(e);
      alert("Mise à jour impossible.");
    }
  };

  // --- Recherche + pagination ---
  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const needle = q.toLowerCase();
    return rows.filter(c =>
      (c.username || "").toLowerCase().includes(needle) ||
      (c.firstName || "").toLowerCase().includes(needle) ||
      (c.lastName || "").toLowerCase().includes(needle) ||
      (c.city || "").toLowerCase().includes(needle) ||
      (c.companyName || "").toLowerCase().includes(needle)
    );
  }, [rows, q]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginated = useMemo(
    () => filtered.slice(startIndex, endIndex),
    [filtered, startIndex, endIndex]
  );

  const goto = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  if (loading) return <div className="cl-root cl-loader">Chargement…</div>;

  return (
    <div className="cl-root">
      <div className="cl-header">
        <h1 className="cl-title">Liste des clients disponibles</h1>

        <div className="cl-toolbar">
          <input
            className="cl-search"
            placeholder="Rechercher un client…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
          />
          <label className="cl-pagesize">
            Afficher
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            lignes
          </label>
        </div>
      </div>

      <div className="cl-table-wrapper">
        <table className="cl-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Nom</th>
              <th>Ville</th>
              <th>Entreprise</th>
              <th>Créé le</th>
              <th className="cl-col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.username}</td>
                <td>{c.lastName} {c.firstName}</td>
                <td>{c.city || "—"}</td>
                <td>{c.companyName || "—"}</td>
                <td>{c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}</td>
                <td className="cl-actions">
                  <Tooltip title="Modifier">
                    <IconButton size="small" onClick={() => handleOpenEdit(c)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(c.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
            {!paginated.length && (
              <tr>
                <td colSpan={7} className="cl-empty">Aucun résultat.</td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={7}>
                <div className="cl-pagination">
                  <div className="cl-count">
                    {total} client{total > 1 ? "s" : ""}
                  </div>
                  <div className="cl-nav">
                    <button className="cl-btn" onClick={() => goto(1)} disabled={currentPage === 1}>
                      « Première
                    </button>
                    <button className="cl-btn" onClick={() => goto(currentPage - 1)} disabled={currentPage === 1}>
                      ‹ Précédent
                    </button>
                    <span className="cl-page-info">
                      Page {currentPage} / {totalPages}
                    </span>
                    <button className="cl-btn" onClick={() => goto(currentPage + 1)} disabled={currentPage === totalPages}>
                      Suivant ›
                    </button>
                    <button className="cl-btn" onClick={() => goto(totalPages)} disabled={currentPage === totalPages}>
                      Dernière »
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Dialog d’édition */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Modifier le client</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            {editForm && (
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField label="Identifiant" name="username" value={editForm.username} onChange={handleEditChange} required />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="Prénom"  name="firstName" value={editForm.firstName} onChange={handleEditChange} required fullWidth />
                  <TextField label="Nom"     name="lastName"  value={editForm.lastName}  onChange={handleEditChange} required fullWidth />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="Code postal" name="postalCode" value={editForm.postalCode} onChange={handleEditChange} fullWidth />
                  <TextField label="Ville"       name="city"       value={editForm.city}       onChange={handleEditChange} fullWidth />
                </Stack>
                <TextField label="Entreprise" name="companyName" value={editForm.companyName} onChange={handleEditChange} />
                <TextField label="Profil / notes" name="profile" value={editForm.profile} onChange={handleEditChange} multiline rows={4} />
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Annuler</Button>
            <Button type="submit" variant="contained">Enregistrer</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
