// src/components/layout/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "@/assets/logo5.png";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import MobileMenu from "./MobileMenu";
import SearchBar from "../common/SearchBar";
import { useCart } from "@/context/CartContext"; // ✅

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { count, openCart } = useCart(); // ✅

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <IconButton className="burger only-mobile" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Link to="/" className="navbar-logo" aria-label="Accueil">
            <img src={logo} alt="Paye ton kawa" />
          </Link>
        </div>

        <nav className="nav-center navbar-links">
          <Link to="/">Acceuil</Link>
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

          <Link to="/account" aria-label="Mon compte">
            <IconButton><PersonOutlineIcon /></IconButton>
          </Link>

          {/* ✅ Badge relié au context + ouvre le drawer du context */}
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

      {/* ✅ tu gardes uniquement le Drawer mobile du menu si tu veux */}
      {/* <Drawer anchor="left"  open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <MobileMenu onClose={() => setMobileOpen(false)} />
      </Drawer> */}
    </header>
  );
}
