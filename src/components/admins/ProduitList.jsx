// src/components/produit/ProduitList.jsx
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/produitApi";

export default function ProduitList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    await deleteProduct(id);
    await load();
  };

  if (loading) return <div>Chargement…</div>;
  if (!items.length) return <div>Aucun produit.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(p => (
        <div key={p.id} className="border rounded p-3 space-y-2">
          {p.imageUrl && (
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />
          )}
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-gray-600">{p.description}</div>
          <div>Couleur : {p.color ?? "-"}</div>
          <div>Prix : {p.price} €</div>
          <div>Stock : {p.stock}</div>
          <button onClick={()=>onDelete(p.id)} className="text-white bg-red-600 px-3 py-1 rounded">
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}
