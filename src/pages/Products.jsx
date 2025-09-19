// src/pages/Products.jsx
import { useAuth } from "@/context/AuthContext";
import AffichageProduit from "@/components/common/affichageProduit";

export default function Products() {
  const { isAuth } = useAuth();
  
  if (!isAuth) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Accès requis</h2>
        <p>Vous devez vous connecter pour voir les produits.</p>
        <a href="/login" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>
          Se connecter
        </a>
      </div>
    );
  }
  
  return <AffichageProduit />;
}
