import { Link } from "react-router-dom";

export default function MobileMenu({ onClose }) {
  return (
    <div className="w-64 p-6">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <nav className="flex flex-col gap-4 text-gray-700">
        <Link to="/" onClick={onClose}>Maison</Link>
        <Link to="/products" onClick={onClose}>Produits</Link>
        <Link to="/categories" onClick={onClose}>Catégories</Link>
        <Link to="/contact" onClick={onClose}>Contact</Link>
        <Link to="/wishlist" onClick={onClose}>Liste de souhaits</Link>
        <Link to="/login" onClick={onClose}>Mon compte</Link>
      </nav>
    </div>
  );
}
