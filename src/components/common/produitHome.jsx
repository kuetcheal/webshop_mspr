import { useEffect, useState } from "react";
import { getProducts, resolvePublicUrl } from "@/api/produitApi";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Swiper (React)
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Keyboard, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

import "./produitHome.css";

const formatPrice = (n) =>
  typeof n === "number"
    ? n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : n;

export default function AffichageProduit() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProducts();
        setItems(data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addToCart = (p) => console.log("add to cart:", p);

  if (loading) return <div className="prod-wrap">Chargement…</div>;
  if (!items.length) return <div className="prod-wrap">Aucun produit.</div>;

  return (
    <div className="prod-wrap">
      {/* ====== Carrousel horizontal continu ====== */}
      <div className="prod-swiper-wrap">
        <Swiper
          modules={[Scrollbar, Keyboard, FreeMode]}
          slidesPerView="auto"            // largeur du slide = CSS
          spaceBetween={25}               // <-- gap EXACT de 25px entre cartes
          freeMode={true}                 // scroll “libre” au trackpad/souris
          centeredSlides={false}
          watchOverflow={true}
          keyboard={{ enabled: true, onlyInViewport: false }}
          scrollbar={{ draggable: true, hide: false }}
          className="prod-swiper"
        >
          {items.map((p) => {
            const imgSrc = resolvePublicUrl(p.imageUrl);
            const outOfStock = (p.stock ?? 0) <= 0;

            return (
              <SwiperSlide key={p.id} className="product-slide">
                <article className="product-card">
                  <div className="product-card__media">
                    {imgSrc ? (
                      <img src={imgSrc} alt={p.name} />
                    ) : (
                      <div className="noimg">Pas d’image</div>
                    )}
                    {outOfStock && (
                      <span className="badge badge--oos">Rupture de stock</span>
                    )}
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
                        <span className="label">Disponible :</span>{" "}
                        {p.stock ?? 0} sacs
                      </span>
                    </div>

                    <button
                      className="btn-add"
                      onClick={() => addToCart(p)}
                      disabled={outOfStock}
                    >
                      <span>Ajouter au panier</span>
                      <AddCircleOutlineIcon className="btn-add__icon" />
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* ====== Bouton “Tous les produits” ====== */}
      <div className="prod-actions">
        <a className="btn-all" href="/Products">TOUS LES PRODUITS</a>
        {/* adapte /Products si ta route est différente */}
      </div>
    </div>
  );
}
