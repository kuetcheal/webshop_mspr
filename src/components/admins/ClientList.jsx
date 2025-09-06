import { useEffect, useState } from "react";
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

export default function ClientList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edition
  const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState(null); // objet client en cours d’édition

  useEffect(() => {
    getClients()
      .then(res => setRows(res.data))
      .catch(err => console.error(err))
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
      const res = await updateClient(id, payload);
      const updated = res.data;

      // remplace la ligne dans le tableau
      setRows(prev => prev.map(c => (c.id === id ? updated : c)));
      setOpenEdit(false);
      setEditForm(null);
    } catch (e) {
      console.error(e);
      alert("Mise à jour impossible.");
    }
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des clients disponibles</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Ville</th>
            <th className="border p-2">Entreprise</th>
            <th className="border p-2">Créé le</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(c => (
            <tr key={c.id}>
              <td className="border p-2">{c.id}</td>
              <td className="border p-2">{c.username}</td>
              <td className="border p-2">{c.lastName} {c.firstName}</td>
              <td className="border p-2">{c.city}</td>
              <td className="border p-2">{c.companyName}</td>
              <td className="border p-2">
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
              </td>
              <td className="border p-2">
                <Stack direction="row" spacing={1}>
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
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog d’édition */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Modifier le client</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            {editForm && (
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField label="Identifiant" name="username" value={editForm.username} onChange={handleEditChange} required />
                <Stack direction="row" spacing={2}>
                  <TextField label="Prénom"  name="firstName" value={editForm.firstName} onChange={handleEditChange} required fullWidth />
                  <TextField label="Nom"     name="lastName"  value={editForm.lastName}  onChange={handleEditChange} required fullWidth />
                </Stack>
                <Stack direction="row" spacing={2}>
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
