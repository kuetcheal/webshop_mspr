import { useEffect, useState } from "react";
import { createProduct, uploadProductImage } from "../../api/produitApi";

export default function ProduitForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    color: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        description: form.description || null,
        color: form.color || null,
        price: parseFloat(form.price || 0),
        stock: parseInt(form.stock || 0, 10),
        imageUrl: file ? null : (form.imageUrl || null),
      };

      // 1. Création du produit
      const created = await createProduct(payload);

      // 2. Upload image si fichier choisi
      let finalProduit = created;
      if (file) {
        finalProduit = await uploadProductImage(created.id, file);
      }

      console.log("Produit final avec image :", finalProduit);

      // reset formulaire
      setForm({ name: "", description: "", color: "", price: "", stock: "", imageUrl: "" });
      setFile(null);
      setPreview("");

      // callback
      onCreated?.(finalProduit);
    } catch (err) {
      console.error(err);
      setError(err.message || "Échec de création du produit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
      {error && <div className="text-red-600">{error}</div>}

      <div>
        <label className="block text-sm font-medium">Nom *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Prix *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">quantité *</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Couleur</label>
        <input
          name="color"
          value={form.color}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Image (URL)</label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://.../image.jpg"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Ou téléverser une image</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {preview && (
          <img
            src={preview}
            alt="aperçu"
            className="mt-2 w-48 h-32 object-cover rounded"
          />
        )}
      </div>

      <button disabled={loading} className="bg-black text-white px-4 py-2 rounded">
        {loading ? "Envoi..." : "Créer le produit"}
      </button>
    </form>
  );
}
