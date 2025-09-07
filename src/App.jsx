import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Home from "./components/home";
import NotFound from "./components/notFound";
import Affiche from "./components/common/affiche";
import AffichageProduit from "./components/common/affichageProduit";
import ProduitHome from "./components/common/produitHome";
import Footer from "@/components/layout/footer";
import ClientForm from "./components/client/ClientForm";
import ClientList from "./components/admins/ClientList";
import ProduitList from "./components/admins/ProduitList";
import Administrateur from "./components/admins/Administrateur";
import ProduitForm from "./components/produit/ProduitForm";

import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/layout/CartDrawer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Categories from "@/pages/Categories";
import Contact from "@/pages/Contact";
import Account from "@/pages/Account";
import { AdminPanelSettingsRounded } from "@mui/icons-material";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/affiche" element={<Affiche />} />
        <Route path="/affichageProduit" element={<AffichageProduit />} />
        <Route path="/produitHome" element={<ProduitHome />} />
        <Route path="/ClientForm" element={<ClientForm />} />
        <Route path="/ProduitForm" element={<ProduitForm />} />
        <Route path="/ProduitList" element={<ProduitList />} />
        <Route path="/ClientList" element={<ClientList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Admin" element={<AdminPanelSettingsRounded />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/Administrateur" element={<Administrateur />} />

      </Routes>
      <CartDrawer />
      <Footer />
    </Router>
  );
};

export default App;

