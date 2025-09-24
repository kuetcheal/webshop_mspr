import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import "./Navbar.css";
import logo from "@/assets/logo5.png";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import SearchBar from "../common/SearchBar";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();
  const { count, openCart } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <Link to="/" className="navbar-logo" aria-label="Accueil">
            <img src={logo} alt="Paye ton kawa" />
          </Link>
        </div>

        <nav className="nav-center navbar-links">
          <Link to="/">Accueil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/categories">Catégories</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="nav-right">
          <div className="search-desktop">
            <SearchBar withIcon placeholder="Rechercher des produits..." />
          </div>

          <IconButton className="only-mobile" onClick={() => setSearchOpen(s => !s)} aria-label="Rechercher">
            <SearchIcon />
          </IconButton>

          {user ? (
            <Link to="/account" aria-label="Mon compte">
              <IconButton><PersonOutlineIcon /></IconButton>
            </Link>
          ) : (
            <IconButton onClick={() => setAuthOpen(true)} aria-label="Connexion">
              <PersonOutlineIcon />
            </IconButton>
          )}

          <IconButton onClick={openCart} aria-label="Panier">
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </div>

      {searchOpen && (
        <div className="search-mobile only-mobile">
          <SearchBar placeholder="Rechercher des produits..." />
        </div>
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
