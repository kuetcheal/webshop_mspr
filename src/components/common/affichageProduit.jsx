import { useEffect, useState } from "react";
import { getProducts, resolvePublicUrl } from "@/api/produitApi";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./AffichageProduit.css";

const formatPrice = (n) =>
  typeof n === "number"
    ? n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : n;

export default function AffichageProduit() {
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

  const addToCart = (p) => console.log("add to cart:", p);

  if (loading) return <div className="prod-wrap">Chargement…</div>;
  if (!items.length) return <div className="prod-wrap">Aucun produit.</div>;

  return (
    <div className="prod-wrap">
      {/* ====== Titre + Sous-titre ====== */}
      <header className="prod-hero">
        <h1 className="prod-hero__title">
          Achat de cafés en grain, moulus ou en capsules
          <br />
          aux meilleurs prix
        </h1>
        <p className="prod-hero__subtitle">
          Sur cette boutique en ligne vous pouvez retrouver uniquement des grains torréfiés
          par nos artisans torréfacteurs. Ces cafés vous pouvez les recevoir en grain,
          moulus, en dosettes souples Senseo ou en capsules compatibles Nespresso.
          Nous faisons le maximum pour vous offrir les meilleurs prix d&apos;achat.
        </p>
      </header>

      {/* ====== Grille produits ====== */}
      <div className="prod-grid">
        {items.map((p) => {
          const imgSrc = resolvePublicUrl(p.imageUrl);
          const outOfStock = (p.stock ?? 0) <= 0;

          return (
            <article key={p.id} className="product-card">
              <div className="product-card__media">
                {imgSrc ? <img src={imgSrc} alt={p.name} /> : <div className="noimg">Pas d’image</div>}
                {outOfStock && <span className="badge badge--oos">Rupture de stock</span>}
              </div>

              <div className="product-card__body">
                <h3 className="product-card__title">{p.name}</h3>
                <p className="product-card__desc">{p.description || "—"}</p>

                <div className="product-card__meta">
                  <span className="price">
                    <span className="label">Prix :</span>{" "}
                    <strong>{formatPrice(p.price)} €</strong>
                    <span className="unit">/kg</span>
                  </span>
                  <span className="sep" />
                  <span className="stock">
                    <span className="label">Disponible :</span> {p.stock ?? 0} sacs
                  </span>
                </div>

                <button className="btn-add" onClick={() => addToCart(p)} disabled={outOfStock}>
                  <span>Ajouter au panier</span>
                  <AddCircleOutlineIcon className="btn-add__icon" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
