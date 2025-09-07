import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { getClients } from "@/api/clientApi";
import { getProducts } from "@/api/produitApi";
import "./admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ clients: 0, produits: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, pRes] = await Promise.all([getClients(), getProducts()]);
        setCounts({ clients: cRes.data.length || 0, produits: pRes.data.length || 0 });
      } catch (e) {
        console.warn("Impossible de charger les compteurs.", e);
      }
    };
    load();
  }, []);

  return (
    <div className="admin-root">
      <h1 className="admin-title">Bienvenu dans votre espace Administration !</h1>

      <div className="admin-grid">
        <button className="admin-card" onClick={() => navigate("/ClientList")}>
          <div className="admin-card__icon">
            <PeopleIcon fontSize="inherit" />
          </div>
          <div className="admin-card__body">
            <div className="admin-card__title">Clients</div>
            <div className="admin-card__meta">{counts.clients} enreg.</div>
          </div>
        </button>

        <button className="admin-card" onClick={() => navigate("/ProduitList")}>
          <div className="admin-card__icon">
            <Inventory2Icon fontSize="inherit" />
          </div>
          <div className="admin-card__body">
            <div className="admin-card__title">Produits</div>
            <div className="admin-card__meta">{counts.produits} enreg.</div>
          </div>
        </button>

        <button className="admin-card" onClick={() => navigate("/CommandeList")}>
          <div className="admin-card__icon">
            <ReceiptLongIcon fontSize="inherit" />
          </div>
          <div className="admin-card__body">
            <div className="admin-card__title">Commandes</div>
            <div className="admin-card__meta">bientôt</div>
          </div>
        </button>
      </div>
    </div>
  );
}
