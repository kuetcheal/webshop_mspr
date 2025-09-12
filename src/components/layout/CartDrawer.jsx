import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { resolvePublicUrl } from "@/api/produitApi";
// import { Link } from "react-router-dom";
import "./CartDrawer.css";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function CartDrawer() {
  const {
    items,
    total,
    count,
    increment,
    decrement,
    removeItem,
    clear,
    isOpen,
    closeCart,
  } = useCart();

  return (
    <div className={`cart-root ${isOpen ? "is-open" : ""}`}>
      {/* Overlay */}
      <div className="cart-overlay" onClick={closeCart} />

      {/* Drawer */}
      <aside className="cart-drawer">
        <div className="cart-header">
          <h2>Panier</h2>
          <button className="cart-close" onClick={closeCart} aria-label="Fermer">
            &times;
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Votre panier est vide.</p>
              <Link to="/affichageProduit" onClick={closeCart} className="cart-browse">
                Parcourir nos produits
              </Link>
            </div>
          ) : (
            <div className="cart-list">
              {items.map((it) => {
                const src = resolvePublicUrl(it.imageUrl);
                return (
                  <div key={it.id} className="cart-item">
                    <img src={src} alt={it.name} className="cart-item__img" />

                    <div className="cart-item__main">
                      <div className="cart-item__title">{it.name}</div>
                      {it.description && (
                        <div className="cart-item__desc">{it.description}</div>
                      )}
                      <div className="cart-item__price">{it.price.toFixed(2)} € / kg</div>

                      <div className="cart-item__row">
                        <div className="qty-controls">
                          <button onClick={() => decrement(it.id)} className="qty-btn">
                            <RemoveIcon fontSize="small" />
                          </button>
                          <div className="qty-value">{it.qty}</div>
                          <button onClick={() => increment(it.id)} className="qty-btn">
                            <AddIcon fontSize="small" />
                          </button>
                        </div>

                        <div className="cart-item__total">
                          {(it.qty * it.price).toFixed(2)} €
                        </div>

                        <button
                          onClick={() => removeItem(it.id)}
                          className="remove-btn"
                          title="Supprimer"
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="cart-footer">
          {items.length > 0 && (
            <>
              <div className="cart-footer__row">
                <button className="link" onClick={clear}>
                  Vider le panier
                </button>
                <div className="muted">
                  {count} article{count > 1 ? "s" : ""}
                </div>
              </div>

              <div className="cart-footer__row">
                <div className="total-label">Total</div>
                <div className="total-value">{total.toFixed(2)} €</div>
              </div>

              <Link to="/checkout" className="btn-checkout" onClick={closeCart}>
                Passer la commande
              </Link>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
