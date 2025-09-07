import { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  uploadProductImage,
  resolvePublicUrl,
} from "../../api/produitApi";
import "./produitList.css";

export default function ProduitList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Edition
  const [editing, setEditing] = useState(null); // objet produit en cours d’édition
  const [editState, setEditState] = useState({
    name: "",
    description: "",
    color: "",
    price: "",
    stock: "",
    imageFile: null,
    previewUrl: "",
  });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setItems(data);
      setPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    const ok = window.confirm("Supprimer ce produit ?");
    if (!ok) return;
    await deleteProduct(id);
    await load();
  };

  const onOpenEdit = (product) => {
    setEditing(product);
    setEditState({
      name: product.name ?? "",
      description: product.description ?? "",
      color: product.color ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      imageFile: null,
      previewUrl: resolvePublicUrl(product.imageUrl) || "",
    });
  };

  const onCloseEdit = () => {
    setEditing(null);
    setEditState({
      name: "",
      description: "",
      color: "",
      price: "",
      stock: "",
      imageFile: null,
      previewUrl: "",
    });
    setSaving(false);
  };

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setEditState((s) => ({ ...s, [name]: value }));
  };

  const onChangeImage = (e) => {
    const file = e.target.files?.[0] || null;
    setEditState((s) => ({
      ...s,
      imageFile: file,
      previewUrl: file ? URL.createObjectURL(file) : s.previewUrl,
    }));
  };

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const payload = {
        name: editState.name?.trim(),
        description: editState.description?.trim(),
        color: editState.color?.trim() || null,
        price: Number(editState.price),
        stock: Number.isFinite(Number(editState.stock)) ? Number(editState.stock) : 0,
      };

      await updateProduct(editing.id, payload);

      // Upload image si fournie
      if (editState.imageFile) {
        await uploadProductImage(editing.id, editState.imageFile);
      }

      await load();
      onCloseEdit();
    } catch (err) {
      console.error(err);
      alert("Échec de la mise à jour du produit.");
      setSaving(false);
    }
  };

  // Pagination calculs
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex]);

  const goto = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  if (loading) return <div className="pl-loader pl-root">Chargement…</div>;
  if (!items.length) return <div className="pl-empty pl-root">Aucun produit.</div>;

  return (
    <div className="pl-root">
      <div className="pl-toolbar">
        <div className="pl-count">
          {total} produit{total > 1 ? "s" : ""}
        </div>
        <div className="pl-pagesize">
          <label>
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

      <div className="pl-table-wrapper">
        <table className="pl-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Couleur</th>
              <th>Prix (€)</th>
              <th>Stock</th>
              <th className="pl-col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => {
              const imgSrc = resolvePublicUrl(p.imageUrl);
              return (
                <tr key={p.id}>
                  <td>
                    {imgSrc ? (
                      <img src={imgSrc} alt={p.name} className="pl-thumb" />
                    ) : (
                      <div className="pl-thumb pl-thumb--placeholder" aria-label="Pas d’image" />
                    )}
                  </td>
                  <td className="pl-td-strong">{p.name}</td>
                  <td className="pl-td-desc" title={p.description || ""}>{p.description}</td>
                  <td>{p.color ?? "—"}</td>
                  <td>{Number(p.price).toLocaleString("fr-FR")}</td>
                  <td>{p.stock}</td>
                  <td className="pl-actions">
                    <button className="pl-btn" onClick={() => onOpenEdit(p)}>Modifier</button>
                    <button className="pl-btn pl-btn-danger" onClick={() => onDelete(p.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>
                <div className="pl-pagination">
                  <button className="pl-btn" onClick={() => goto(1)} disabled={currentPage === 1}>
                    « Première
                  </button>
                  <button className="pl-btn" onClick={() => goto(currentPage - 1)} disabled={currentPage === 1}>
                    ‹ Précédent
                  </button>
                  <span className="pl-page-info">
                    Page {currentPage} / {totalPages}
                  </span>
                  <button className="pl-btn" onClick={() => goto(currentPage + 1)} disabled={currentPage === totalPages}>
                    Suivant ›
                  </button>
                  <button className="pl-btn" onClick={() => goto(totalPages)} disabled={currentPage === totalPages}>
                    Dernière »
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Modal Edition */}
      {editing && (
        <div className="pl-modal" role="dialog" aria-modal="true">
          <div className="pl-modal__backdrop" onClick={saving ? undefined : onCloseEdit} />
          <div className="pl-modal__content" aria-labelledby="edit-title">
            <div className="pl-modal__header">
              <h3 id="edit-title">Modifier le produit</h3>
              <button className="pl-modal__close" onClick={onCloseEdit} disabled={saving} aria-label="Fermer">×</button>
            </div>
            <form className="pl-form" onSubmit={onSubmitEdit}>
              <div className="pl-form__grid">
                <div className="pl-form__col">
                  <label className="pl-label">Nom</label>
                  <input
                    name="name"
                    className="pl-input"
                    value={editState.name}
                    onChange={onChangeField}
                    required
                  />

                  <label className="pl-label">Description</label>
                  <textarea
                    name="description"
                    className="pl-textarea"
                    rows={4}
                    value={editState.description}
                    onChange={onChangeField}
                  />

                  <div className="pl-row2">
                    <div>
                      <label className="pl-label">Couleur</label>
                      <input
                        name="color"
                        className="pl-input"
                        value={editState.color}
                        onChange={onChangeField}
                        placeholder="ex: Rouge"
                      />
                    </div>
                    <div>
                      <label className="pl-label">Prix (€)</label>
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        className="pl-input"
                        value={editState.price}
                        onChange={onChangeField}
                        required
                      />
                    </div>
                    <div>
                      <label className="pl-label">Stock</label>
                      <input
                        name="stock"
                        type="number"
                        className="pl-input"
                        value={editState.stock}
                        onChange={onChangeField}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pl-form__col">
                  <label className="pl-label">Image</label>
                  <div className="pl-image-field">
                    <div className="pl-image-preview">
                      {editState.previewUrl ? (
                        <img src={editState.previewUrl} alt="Prévisualisation" />
                      ) : (
                        <div className="pl-image-placeholder">Aperçu</div>
                      )}
                    </div>
                    <input type="file" accept="image/*" onChange={onChangeImage} />
                    <small className="pl-help">Laisser vide pour conserver l’image actuelle.</small>
                  </div>
                </div>
              </div>

              <div className="pl-modal__footer">
                <button type="button" className="pl-btn" onClick={onCloseEdit} disabled={saving}>
                  Annuler
                </button>
                <button type="submit" className="pl-btn pl-btn-primary" disabled={saving}>
                  {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
