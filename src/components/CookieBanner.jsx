import { useState, useEffect } from "react";
import "./CookieBanner.css";

function CookieBanner() {
  const [consent, setConsent] = useState(localStorage.getItem("consent") || null);

  const handleConsent = (value) => {
    localStorage.setItem("consent", value);
    setConsent(value);
  };

  // Bloquer le scroll tant que l’utilisateur n’a pas choisi
  useEffect(() => {
    if (!consent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [consent]);

  if (consent) return null;

  return (
    <div className="cookie-popup-overlay">
      <div className="cookie-popup card shadow">
        <div className="card-body text-center">
          <h5 className="card-title">☕ Politique de cookies</h5>
          <p className="card-text">
            Nous utilisons des cookies pour améliorer votre expérience.{" "}
            <a href="/privacyPolicy" className="link">En savoir plus</a>
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button className="btn btn-accept" onClick={() => handleConsent("accepted")}>
              Accepter
            </button>
            <button className="btn btn-refuse" onClick={() => handleConsent("refused")}>
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
