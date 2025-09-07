import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Si tu veux normaliser ici l'URL de l'image, dé-commente et adapte :
// import { resolvePublicUrl } from "@/api/produitApi";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const STORAGE_KEY = "cart-v1";

export function CartProvider({ children }) {
  // --- ÉTAT PANIER ---
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // --- OUVERTURE / FERMETURE DU TIROIR ---
  const [isOpen, setIsOpen] = useState(false);
  const openCart   = () => setIsOpen(true);
  const closeCart  = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(v => !v);

  // --- PERSISTANCE ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // --- ACTIONS ---
  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(it => it.id === product.id);
      if (i > -1) {
        const copy = [...prev];
        copy[i] = {
          ...copy[i],
          qty: Math.min((copy[i].qty || 0) + qty, product.stock ?? Infinity),
        };
        return copy;
      }

      // const normalizedUrl = resolvePublicUrl
      //   ? resolvePublicUrl(product.imageUrl)
      //   : product.imageUrl;

      return [
        ...prev,
        {
          id:          product.id,
          name:        product.name,
          price:       product.price,
          imageUrl:    product.imageUrl, // ou normalizedUrl
          description: product.description ?? "",
          stock:       product.stock,
          qty,
        },
      ];
    });
  };

  const removeItem = (id) =>
    setItems(prev => prev.filter(it => it.id !== id));

  const updateQty = (id, qty) =>
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, qty: Math.max(1, qty) } : it
      )
    );

  const increment = (id) =>
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, qty: (it.qty || 1) + 1 } : it
      )
    );

  const decrement = (id) =>
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, qty: Math.max(1, (it.qty || 1) - 1) } : it
      )
    );

  const clear = () => setItems([]);

  // --- DÉRIVÉS ---
  const count = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items]
  );
  const total = useMemo(
    () => items.reduce((s, i) => s + i.qty * i.price, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    increment,
    decrement,
    clear,
    count,
    total,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
