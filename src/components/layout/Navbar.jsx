import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import logo from "@/assets/logo5.png";

// MUI
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// internes
import MobileMenu from "./MobileMenu";
import CartDrawer from "./CartDrawer";
import SearchBar from "../common/SearchBar";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // toggle mobile

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Bloc 1 : Logo + burger */}
        <div className="nav-left">
          <IconButton className="burger only-mobile" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Link to="/" className="navbar-logo" aria-label="Accueil">
            <img src={logo} alt="Paye ton kawa" />
          </Link>
        </div>

        {/* Bloc 2 : Liens (desktop) */}
        <nav className="nav-center navbar-links">
          <Link to="/">Acceuil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/categories">Catégories</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Bloc 3 : Recherche (desktop) + Icônes */}
        <div className="nav-right">
          {/* Recherche toujours visible en desktop, cachée en mobile */}
          <div className="search-desktop">
            <SearchBar withIcon placeholder="Rechercher des produits..." />
          </div>

          {/* Icône loupe (UNIQUEMENT mobile) pour afficher la recherche en dessous */}
          <IconButton className="only-mobile" onClick={() => setSearchOpen(s => !s)} aria-label="Rechercher">
            <SearchIcon />
          </IconButton>

          <Link to="/account" aria-label="Mon compte">
            <IconButton><PersonOutlineIcon /></IconButton>
          </Link>

          <IconButton onClick={() => setCartOpen(true)} aria-label="Panier">
            <Badge badgeContent={0} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </div>

      {/* Barre de recherche MOBILE (sous la navbar) */}
      {searchOpen && (
        <div className="search-mobile only-mobile">
          <SearchBar placeholder="Rechercher des produits..." />
        </div>
      )}

      {/* Drawers */}
      <Drawer anchor="left"  open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <MobileMenu onClose={() => setMobileOpen(false)} />
      </Drawer>
      <Drawer anchor="right" open={cartOpen}   onClose={() => setCartOpen(false)}>
        <CartDrawer />
      </Drawer>
    </header>
  );
}
